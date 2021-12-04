import styles from "./Player.module.css";

type PlayerProps = {
  name: string;
  vote: string;
};

export const Player = ({ name, vote }: PlayerProps) => {
  return (
    <div className={styles.player}>
      <span className={styles.vote}>{vote}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
