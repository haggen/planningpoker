import { Card } from "src/components/Card";
import { useGameState } from "src/components/App";

import styles from "./Deck.module.css";

// type DeckProps = {};

export const Deck = () => {
  const { currentPlayer, dispatch } = useGameState();

  const handleVote = (value: string) => {
    if (!currentPlayer) {
      return;
    }
    dispatch({
      type: "changePlayerVote",
      payload: { id: currentPlayer.id, vote: value },
    });
  };

  return (
    <ul className={styles.deck}>
      <li>
        <Card value="0" onVote={handleVote} />
      </li>
      <li>
        <Card value="0.5" onVote={handleVote} />
      </li>
      <li>
        <Card value="1" onVote={handleVote} />
      </li>
      <li>
        <Card value="2" onVote={handleVote} />
      </li>
      <li>
        <Card value="3" onVote={handleVote} />
      </li>
      <li>
        <Card value="5" onVote={handleVote} />
      </li>
      <li>
        <Card value="8" onVote={handleVote} />
      </li>
      <li>
        <Card value="13" onVote={handleVote} />
      </li>
      <li>
        <Card value="20" onVote={handleVote} />
      </li>
      <li>
        <Card value="40" onVote={handleVote} />
      </li>
      <li>
        <Card value="100" onVote={handleVote} />
      </li>
      <li>
        <Card value="?" onVote={handleVote} />
      </li>
    </ul>
  );
};
