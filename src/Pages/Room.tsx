import React, { useEffect } from 'react';
import { FormEvent, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';

import logoImg from '../Assets/images/logo.svg';
import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams ={ 
  id: string
};

export function Room() {
  const roomDbRef = "rooms/";
  const questionDbRef = "/questions";
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { user, signInWithGoogle } = useAuth();
  const { questions, title } = useRoom(roomId);

  const [question, setQuestion] = useState('');
  
  const handleSendQuestion = async(event: FormEvent) => {
    event.preventDefault();
    if(question.trim() === ''){
      return;
    }
    if(!user) {
      await signInWithGoogle();
    }

    const newQuestion = {
      content: question,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isAnswered: false,
      isHighlighted: false
    };

    const questionsPath = `${roomDbRef}${roomId}${questionDbRef}`;
    await database.ref(questionsPath).push(newQuestion);
    setQuestion('');
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk logo image" />
          <RoomCode code={ roomId }/>
        </div>
      </header>

      <main>

        <div className="room-title">
          <h1>{title}</h1>
          { (questions?.length > 0) && 
            <span className="question-counter"> 
              {questions?.length} Perguntas feitas até o momento
            </span>
          }
        </div>
        <div id="questions">
          <h2>Faça sua pergunta</h2>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="Diga ao dono da sala suas dúvidas!" 
            onChange={event => setQuestion(event.target.value)}
          />
          <div className="form-footer">
          { (!user) 
            ?(<span>
                É necessário estar logado para fazer perguntas
                <button onClick={signInWithGoogle}>
                  clique aqui
                </button>
              </span> 
            )
            :(<span >
                <img src={user?.avatar} alt="User profile picture" />
                <p>{user?.name}</p>
              </span> 
            )
          }
            <Button 
              disabled={(!user)} 
              type="submit">
              Enviar Pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
        { questions.map( question => {
            return(
              <Question 
                key={ question.id }
                content={question.content} 
                author={question.author}
              />
            );
          })
        }
        </div>

      </main>
    </div>
  );
}
