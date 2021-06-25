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

    async function handleDeleQuestion(questionsId: string) {
        if (window.confirm('Você tem certeza que quer excluir essa pergunta?')) {
            await database.ref(`room/${roomId}/questions/${questionsId}`).remove()
        }

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
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleQuestion(question.id)}>
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