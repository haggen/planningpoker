// import * as classes from "./style.module.css";

import { useEffect } from "react";

import { Button } from "~/src/components/Button";
import { Deck } from "~/src/components/Deck";
import { Flex } from "~/src/components/Flex";
import { Score } from "~/src/components/Score";
import { Table } from "~/src/components/Table";
import { THand, TProfile, useGame, usePlayers } from "~/src/lib/data";

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
  const { clientId, players: state, setName } = usePlayers();

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

  return (
    <Flex direction="column" align="center" gap="3rem">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3rem"
        style={{ flex: "1 0 auto" }}
      >
        <Table clients={state} hands={hands} stage={stage} />

        <div>
          {stage === "voting" ? (
            <Button onClick={handleStageChange}>Reveal</Button>
          ) : (
            <Button variant="hollow" onClick={handleStageChange}>
              Restart
            </Button>
          )}
        </div>
      </Flex>

      {stage === "voting" ? (
        <Deck hand={hands[clientId]} onSelect={handleSelect} />
      ) : (
        <Score hands={hands} />
      )}
    </Flex>
  );
}
