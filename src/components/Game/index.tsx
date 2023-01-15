// import * as classes from "./style.module.css";

import { useEffect } from "react";

import { Button } from "~/src/components/Button";
import { Card } from "~/src/components/Card";
import { Flex } from "~/src/components/Flex";
import { Player } from "~/src/components/Player";
import { THand, TProfile, useGame, usePlayers } from "~/src/lib/data";

const availableDeck = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, "?", "w"] as const;

const profileKey = "profile";
const handKey = "hand";

function getStoredValue<T>(key: string, defaultValue: T): T;
function getStoredValue<T>(key: string): T | null;
function getStoredValue<T>(key: string, defaultValue?: T) {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored) as T;
  }
  return defaultValue ?? null;
}

function setStoredValue<T>(key: string, value: T) {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function Game() {
  const { stage, hands, setStage, setHand } = useGame();
  const { clientId, count, players: state, setName } = usePlayers();

  useEffect(() => {
    if (state[clientId]?.name) {
      setStoredValue(profileKey, state[clientId]);
      setStoredValue(handKey, hands[clientId]);
      return;
    }

    const profile = getStoredValue<TProfile>(profileKey, { name: clientId });
    setName(profile.name);

    // Remmeber last watchers.
    const hand = getStoredValue<THand>(handKey);
    if (hand === "w") {
      setHand(hand);
    }
  }, [clientId, hands, setHand, setName, state]);

  const handleSelect = (value: THand) => {
    setHand(value);
  };

  const handleStageChange = () => {
    if (stage === "voting") {
      setStage("reveal");
    } else {
      setStage("voting");
    }
  };

  if (count === 0) {
    return <Flex justify="center">Connecting…</Flex>;
  }

  return (
    <Flex direction="column" align="center" gap="3rem">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3rem"
        style={{ flex: "1 0 auto" }}
      >
        <Flex gap="1.5rem">
          {Object.keys(state).map((key) => (
            <Player
              key={key}
              name={state[key].name}
              hand={hands[key]}
              covered={stage === "voting"}
            />
          ))}
        </Flex>
        <div>
          <Button
            variant={stage === "voting" ? "default" : "hollow"}
            onClick={handleStageChange}
          >
            {stage === "voting" ? "Reveal" : "Restart"}
          </Button>
        </div>
      </Flex>

      <Flex as="menu" gap=".5rem" justify="center">
        {availableDeck.map((value) => (
          <li key={value}>
            <Card
              value={value}
              selected={hands[clientId] === value}
              onSelect={handleSelect}
            />
          </li>
        ))}
      </Flex>
    </Flex>
  );
}
