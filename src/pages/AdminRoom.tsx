import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';

/* import { useAuth } from '../hooks/useAuth'; */
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import '../styles/room.scss'
import { database } from '../services/firebase';
import checkImg from '../assets/images/check.svg'
import  answerImg from '../assets/images/answer.svg'

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    /*  const { user } = useAuth(); */
    const params = useParams<RoomParams>();
    const history = useHistory();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endeAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionsId: string) {
        if (window.confirm('Você tem certeza que quer excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionsId}`).remove()
        }

    }
    async function handleCheckQuestionAsAnswered(questionsId: string){
        await database.ref(`rooms/${roomId}/questions/${questionsId}`).update({
            isAnswered: true,
        })

    }

    async function handleHighlightQuestion(questionsId: string){
        await database.ref(`rooms/${roomId}/questions/${questionsId}`).update({
           isHighlighted : true,
        })

    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>


                {/* {JSON.stringify(questions)}   */}
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted ={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marcar pergunta com respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destagem as perguntas pergunta" />
                                        </button>
                                    </>
                                ) }    
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}