import { FormEvent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import logoImg from "../Assets/images/logo.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";

export function Room() {
  const { user, signInWithGoogle } = useAuth();
  const  roomCode = '';


  function copyRoomCodeToClipboard(event: MouseEvent){ 

    window.Clipboard
  }

  const handleSendQuestion = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk logo image" />
          <RoomCode /* onClick={ copyRoomCodeToClipboard } */ />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>NOME DA SALA AQUI </h1>
          <span> X Perguntas feitas até o momento</span>
        </div>
        <div id="questions">
          <h2>Faça sua pergunta</h2>
        </div>
      </main>
      <form onSubmit={handleSendQuestion}>
        <textarea placeholder="Diga ao dono da sala suas dúvidas!"/>
        <div className="form-footer">
        <span> É necessário <button onClick={ signInWithGoogle }>logar</button> para fazer perguntas.</span>
            <Button type="submit">Enviar Pergunta</Button> 
        </div> 
      </form>
        

    </div>
  );
}