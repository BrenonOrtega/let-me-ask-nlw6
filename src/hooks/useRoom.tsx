import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = { 
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

export function useRoom(roomId: string) {
  const roomDbRef = "rooms/";
  const questionDbRef = "/questions";

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState(roomId);

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

  return { questions, title };
}