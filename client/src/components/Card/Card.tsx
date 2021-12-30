import styles from "./Card.module.css";

type CardProps = {
  value: string;
  onVote: (value: string) => void;
};

export const Card = ({ value, onVote }: CardProps) => {
  const handleClick = () => {
    onVote(value);
  };

  return (
    <button className={styles.card} onClick={handleClick}>
      {value}
    </button>
  );
};
