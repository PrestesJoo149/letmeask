import illustrationImg from '../assets/images/illustration.svg'
import {Button} from '../components/Button'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss';


export function NewRoom() {
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>                   
                    <form >
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar  na sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em um sala existente? <a href="#">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}