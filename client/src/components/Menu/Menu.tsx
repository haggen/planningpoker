import { Button } from "src/components/Button";
import {
  Phase,
  useGameState,
  promptPlayerName,
  timeToReveal,
} from "src/components/App";
import { Countdown } from "src/components/Countdown";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase, playerId, players, dispatch } = useGameState();

  const player = players[playerId];

  const handleReveal = () => {
    dispatch({ type: "game/reveal" });
  };

  const handleRestart = () => {
    dispatch({ type: "game/restart" });
  };

  const handleRename = () => {
    if (!player) {
      return;
    }
    const name = promptPlayerName(player.name);
    dispatch({
      type: "player/rename",
      payload: { id: player.id, name },
    });
  };

  return (
    <ul className={styles.menu}>
      <li>
        {phase === Phase.Voting ? (
          <Button onClick={handleReveal}>Revelar</Button>
        ) : phase === Phase.Countdown ? (
          <Button>
            <Countdown target={Date.now() + timeToReveal} />
          </Button>
        ) : (
          <Button onClick={handleRestart}>Recomeçar</Button>
        )}
      </li>
      <li>
        <Button appearance="ghost" onClick={handleRename}>
          {player?.name}
        </Button>
      </li>
    </ul>
  );
};
