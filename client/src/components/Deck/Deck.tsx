import { Card } from "src/components/Card";
import { useGameState, Player } from "src/components/App";

import styles from "./Deck.module.css";

const options = [
  { text: "0", value: 0 },
  { text: "½", value: 0.5 },
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "8", value: 8 },
  { text: "13", value: 13 },
  { text: "20", value: 20 },
  { text: "40", value: 40 },
  { text: "100", value: 100 },
  { text: "?", value: "?" as const },
];

export const Deck = () => {
  const { playerId, players, dispatch } = useGameState();

  const player = players[playerId];

  const handleVote = (vote: Player["vote"]) => {
    if (!player) {
      return;
    }
    dispatch({
      type: "player/vote",
      payload: { id: player.id, vote: vote === player.vote ? undefined : vote },
    });
  };

  return (
    <ul className={styles.deck}>
      {options.map(({ text, value }) => (
        <li key={value}>
          <Card
            value={value}
            text={text}
            active={player?.vote === value}
            onVote={handleVote}
          />
        </li>
      ))}
    </ul>
  );
};
