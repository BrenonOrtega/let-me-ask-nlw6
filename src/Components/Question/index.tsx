import { ReactNode } from "react";
import cx from "classnames";
import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted: boolean;
  isAnswered: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  ...props
}: QuestionProps) {
  return (
    <div
      className={`question 
      ${cx({
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      })}`}
    >
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
