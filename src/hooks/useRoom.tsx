import { useEffect, useState } from "react";
import { database, firebase } from "../services/firebase";
import { useAuth } from "./useAuth";

type firebaseResponse = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type FirebaseQuestion = firebaseResponse;

export type QuestionType = {
  id?: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const roomDbRef = "rooms";
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState(roomId);

  useEffect(() => {
    const roomReferences = database.ref(`${roomDbRef}/${roomId}`);

    roomReferences.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([likeId, likeInfo]) => likeInfo.authorId === user?.id
            )?.[0],
          };
        }
      );

      parsedQuestions.forEach((value) => console.log(value.likeId));
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => roomReferences.off("value");
  }, [roomId, user?.id]);

  return { questions, title };
}
