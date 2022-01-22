import { useGameState, Phase, Player as PlayerType } from "src/components/App";

import { ReactComponent as Check } from "./Check.svg";
import { ReactComponent as Hourglass } from "./Hourglass.svg";

import styles from "./Player.module.css";

type PlayerProps = {
  name: string;
  vote: PlayerType["vote"];
};

export const Player = ({ name, vote }: PlayerProps) => {
  const { phase } = useGameState();

  return (
    <div className={styles.player}>
      <span className={styles.vote}>
        {phase === Phase.Voting ? (
          vote === undefined ? (
            <Hourglass />
          ) : (
            <Check />
          )
        ) : (
          vote ?? "-"
        )}
      </span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
