import c from "classnames";

import { Player } from "src/components/App";

import styles from "./Card.module.css";

type CardProps = {
  text: string;
  value: Player["vote"];
  active: boolean;
  onVote: (vote: Player["vote"]) => void;
};

export const Card = ({ text, value, active, onVote }: CardProps) => {
  const handleClick = () => {
    onVote(value);
  };

  return (
    <button
      className={c(styles.card, { [styles.active]: active })}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
