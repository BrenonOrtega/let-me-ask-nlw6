import React, { useEffect } from 'react';
import { FormEvent, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';

import logoImg from '../Assets/images/logo.svg';
import '../styles/room.scss';


type RoomParams ={ id: string; }

type Question = { 
  id?: string, 
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
};

type FirebaseQuestion = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

export function Room() {
  const roomDbRef = "rooms/";
  const questionDbRef = "/questions";
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState(roomId);
  
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

  useEffect(() => {
    const roomReferences = database.ref(roomDbRef+roomId)
    
    roomReferences.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object
        .entries(firebaseQuestions)
        .map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
      });
      
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);



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
          <textarea placeholder="Diga ao dono da sala suas dúvidas!" onChange={event => setQuestion(event.target.value)}/>
          <div className="form-footer">
            {(! user ) 
            ? (<span>
                É necessário estar logado para fazer perguntas
                <button onClick={signInWithGoogle}>clique aqui</button>
              </span> )
            : (<span >
                <img src={user?.avatar} alt="User profile picture" />
                <p>{user?.name}</p>
              </span> )
            }
            <Button disabled={(!user)} type="submit">Enviar Pergunta</Button>
          </div>
        </form>

        <div className="questions">
          {/* {questions.forEach( question => {
            <div>
            <span id="owner-profile">
              <img src={question?.author.avatar} alt="question owner profile" />
              {question.author.name}
            </span>
              <p>{question.content}</p>
            </div>
          })} */}
          {JSON.stringify(questions)}
        </div>

      </main>
    </div>
  );
}
