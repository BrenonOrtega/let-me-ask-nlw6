import React from "react";
import { FormEvent, useState } from "react";

import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { HandleNewLike, LikeType } from "./scripts";

import logoImg from "../../Assets/images/logo.svg";
import "../../styles/room.scss";

type RoomParams = {
  id: string;
};

export default function Room() {
  const roomDbRef = "rooms/";
  const questionDbRef = "/questions";
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user, signInWithGoogle } = useAuth();
  const { questions, title } = useRoom(roomId);

  const [question, setQuestion] = useState("");

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (question.trim() === "") {
      return;
    }
    if (!user) {
      await signInWithGoogle();
    }

    const newQuestion = {
      content: question,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isAnswered: false,
      isHighlighted: false,
    };

    const questionsPath = `${roomDbRef}${roomId}${questionDbRef}`;
    await database.ref(questionsPath).push(newQuestion);
    setQuestion("");
  };
  const handleNewLike = async (like: LikeType) => HandleNewLike(like);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk logo image" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions?.length > 0 && (
            <span className="question-counter">
              {questions?.length} Perguntas feitas até o momento
            </span>
          )}
        </div>
        <div id="questions">
          <h2>Faça sua pergunta</h2>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="Diga ao dono da sala suas dúvidas!"
            onChange={(event) => setQuestion(event.target.value)}
          />
          <div className="form-footer">
            {!user ? (
              <span>
                <span>É necessário estar logado para fazer perguntas</span>
                <button onClick={signInWithGoogle}>clique aqui</button>
              </span>
            ) : (
              <span>
                <img src={user?.avatar} alt="User profile picture" />
                <p>{user?.name}</p>
              </span>
            )}
            <Button disabled={!user} type="submit">
              Enviar Pergunta
            </Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  className={`like-button ${question.likeId ? "liked" : ""}`}
                  type="button"
                  aria-label="give a like"
                  onClick={async () =>
                    handleNewLike({
                      roomId,
                      userId: user?.id,
                      questionId: question.id,
                      likeId: question.likeId,
                    })
                  }
                >
                  {question.likeCount > 0 && <div>{question.likeCount} </div>}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
