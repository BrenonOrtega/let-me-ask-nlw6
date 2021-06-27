import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import logoImg from "../Assets/images/logo.svg";
import illustrationImg from "../Assets/images/illustration.svg";
import "../styles/auth.scss";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }

    const roomReference = database.ref("rooms");
    const createdRoom = await roomReference.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`${createdRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Imagem da logo do let me ask" />
          <h1>Olá {user?.name}</h1>
          <h2>Crie uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
