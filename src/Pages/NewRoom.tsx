import { Link } from "react-router-dom";
import { Button } from "../Components/Button";

import logoImg from "../Assets/images/logo.svg";
import illustrationImg from "../Assets/images/illustration.svg";

import "../Styles/auth.scss";

export function NewRoom(props: any) {
    return (
        <div id="page-auth">
        <aside>
            <img src={ illustrationImg } alt="Ilustração de perguntas e respostas"/>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="Imagem da logo do let me ask"/>
                <h2>Crie uma nova sala</h2>
                <form>
                    <input
                    type="text"
                    placeholder="Nome da sala"
                    />
                    <Button>
                        Criar sala
                    </Button>
                </form>
                <p>
                    Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                </p>
            </div>
        </main>
    </div>
    );
}