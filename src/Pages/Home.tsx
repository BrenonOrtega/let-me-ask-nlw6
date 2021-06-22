import { useHistory } from "react-router-dom";
import { Button } from "../Components/Button";

import illustrationImg from "../Assets/images/illustration.svg";
import googleIcon from "../Assets/images/google-icon.svg";
import logoImg from "../Assets/images/logo.svg";

import "../Styles/auth.scss";
import { auth, firebase } from "../services/firebase";

export function Home() {
    const history = useHistory();
    
    function HandleCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth().signInWithPopup(provider).then(result => {
            console.log(result);
        });
            //history.push("/rooms/new");
    }

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
                        <button onClick={HandleCreateRoom} className="create-room" >
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