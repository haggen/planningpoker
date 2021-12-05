import { Button } from "src/components/Button";
import { GamePhase, useGameState, promptPlayerName } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase, currentPlayer, dispatch } = useGameState();

  const handleReveal = () => {
    dispatch({ type: "changePhase", payload: GamePhase.Reveal });
  };

  const handleRestart = () => {
    dispatch({ type: "changePhase", payload: GamePhase.Voting });
  };

  const handleChangeName = () => {
    if (!currentPlayer) {
      return;
    }
    dispatch({
      type: "changePlayerName",
      payload: { id: currentPlayer.id, name: promptPlayerName() },
    });
  };

  return (
    <ul className={styles.menu}>
      <li>
        {phase === GamePhase.Voting ? (
          <Button onClick={handleReveal}>Revelar</Button>
        ) : (
          <Button onClick={handleRestart}>Recomeçar</Button>
        )}
      </li>
      <li>
        <Button type="ghost" onClick={handleChangeName}>
          {currentPlayer?.name}
        </Button>
      </li>
    </ul>
  );
};
