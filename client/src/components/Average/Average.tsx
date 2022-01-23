import { useGameState } from "src/components/App";

import styles from "./Average.module.css";

export const Average = () => {
  const { players } = useGameState();

  const votes = Object.values(players)
    .map(({ vote }) => vote)
    .filter((vote): vote is number => typeof vote === "number");
  const average = votes.reduce((sum, vote) => sum + vote, 0) / votes.length;

  return (
    <div className={styles.average}>
      <span>{isNaN(average) ? "-" : average.toFixed(1)}</span>
    </div>
  );
};
