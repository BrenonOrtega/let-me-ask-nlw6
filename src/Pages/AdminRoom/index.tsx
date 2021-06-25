import React, { useEffect } from 'react';
import { FormEvent, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

import logoImg from '../../Assets/images/logo.svg';
import '../../styles/room.scss';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';


type RoomParams ={ 
  id: string
};

export default function Room() {
  const roomDbRef = "rooms/";
  const questionDbRef = "/questions";
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { questions, title } = useRoom(roomId);

  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk logo image" />
          <div>
              <RoomCode code={ roomId }/>
              <Button isOutlined>Encerrar sala</Button>
          </div>
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

        <div className="question-list">
        { questions.map( question => {
            return(
              <Question 
                key={ question.id }
                content={question.content} 
                author={question.author}
              />
            ); })
        }
        </div>

      </main>
    </div>
  );
}
