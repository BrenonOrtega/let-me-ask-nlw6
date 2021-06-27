import { ReactNode } from "react";
import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, ...props }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="question author profile pic" />
          <span>{author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer>
    </div>
  );
}