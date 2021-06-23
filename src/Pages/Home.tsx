import { useState, useContext, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../Assets/images/illustration.svg";
import googleIcon from "../Assets/images/google-icon.svg";
import logoImg from "../Assets/images/logo.svg";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {
  const roomRefName = "rooms/";
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] =useState("");

  async function HandleSignInWithGoogle() : Promise<void>
  {
    if(!user) {
        await signInWithGoogle();
    }
    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent){
    console.log(roomCode);
    event.preventDefault();
    if (roomCode.trim() === ""){
      alert("Room code should not be empty");
      return;
    }

    const roomRefence = await database.ref(`${roomRefName}${roomCode}`).get();
    if(!roomRefence.exists()){
      alert("Room does not exists");
      return;
    }
    history.push(`${roomRefName}${roomCode}`);
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
                      <button onClick={HandleSignInWithGoogle} className="create-room" >
                          <img src={googleIcon} alt="Logotipo do google"/>
                          Crie sua sala com o Google.
                      </button>
                  </div>
                  <div className="separator">Ou entre em uma sala</div>
                  <form
                    onSubmit={handleJoinRoom}
                  >
                      <input
                        type="text"
                        placeholder="Digite o código da sala"
                        onChange={ event => setRoomCode(event.target.value)}
                      />
                      <Button
                        type="submit"
                      >
                          Entrar na sala
                      </Button>
                  </form>
              </div>
          </main>
      </div>
  );
}