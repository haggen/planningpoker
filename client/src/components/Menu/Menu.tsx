import { Button } from "src/components/Button";
import { Phase, useGameState } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase, playerId, players, dispatch } = useGameState();

  const currentPlayer = players.find(({ id }) => id === playerId);

  const handleReveal = () => {
    dispatch({ type: "game/reveal" });
  };

  const handleRestart = () => {
    dispatch({ type: "game/restart" });
  };

  const handleRename = () => {
    if (!playerId) {
      return;
    }
    const name = prompt("Name:") ?? "Anônimo";
    dispatch({
      type: "player/rename",
      payload: { id: playerId, name },
    });
  };

  return (
    <ul className={styles.menu}>
      <li>
        {phase === Phase.Voting ? (
          <Button onClick={handleReveal}>Revelar</Button>
        ) : (
          <Button onClick={handleRestart}>Recomeçar</Button>
        )}
      </li>
      <li>
        <Button type="ghost" onClick={handleRename}>
          {currentPlayer?.name}
        </Button>
      </li>
    </ul>
  );
};
