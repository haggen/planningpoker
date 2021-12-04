import { useGameState, GamePhase } from "src/components/App";

import { ReactComponent as CheckMark } from "src/images/checkMark.svg";
import { ReactComponent as Hourglass } from "src/images/hourglass.svg";

import styles from "./Player.module.css";

type PlayerProps = {
  name: string;
  vote: string;
};

export const Player = ({ name, vote }: PlayerProps) => {
  const { phase } = useGameState();

  return (
    <div className={styles.player}>
      <span className={styles.vote}>
        {phase === GamePhase.Voting ? (
          vote ? (
            <CheckMark />
          ) : (
            <Hourglass />
          )
        ) : (
          vote
        )}
      </span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
