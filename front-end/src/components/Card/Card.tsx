import styles from "./Card.module.css";

type CardProps = {
  value: string;
};

export const Card = ({ value }: CardProps) => {
  return <button className={styles.card}>{value}</button>;
};
