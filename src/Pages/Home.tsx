import illustrationImg from "../Assets/images/illustration.svg";
import logoImg from "../Assets/images/logo.svg";
import googleIcon from "../Assets/images/google-icon.svg";

import "../Styles/auth.scss";
import { Button } from "../Components/Button";

export function Home() {
    return (
        <div id="page-auth">
            <aside>
                <img src={ illustrationImg } alt="Ilustração de perguntas e respostas"/>
                <h1><strong>Crie salas de Q&amp;A ao-vivo.</strong></h1>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Imagem da logo do let me ask"/>
                    <div>
                        <p>Tire suas dúvidas em tempo real.</p>
                        <button className="create-room" >
                            <img src={googleIcon} alt="Logotipo do google"/>
                            Crie sua sala com o Google.
                        </button>
                    </div>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input
                        type="text"
                        placeholder="Digite o código da sala"
                        />
                        <Button>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}