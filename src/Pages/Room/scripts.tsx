import { database } from "../../services/firebase";

export type LikeType = {
  roomId?: string;
  userId?: string;
  questionId?: string;
  likeId?: string;
};

export async function HandleNewLike({
  roomId,
  questionId,
  userId,
  likeId,
}: LikeType) {
  if (!userId) {
    return;
  }

  if (likeId) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
      .remove();
  } else {
    await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
      authorId: userId,
    });
  }
  console.log("fiz bosta nenhuma");
}
