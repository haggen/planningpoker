// import * as classes from "./style.module.css";

import { Flex } from "~/src/components/Flex";
import { Player } from "~/src/components/Player";
import { THands, TProfile, TStage } from "~/src/lib/data";

type Props = {
  clients: Record<string, TProfile>;
  hands: THands;
  stage: TStage;
};

/**
 * Get table width. 7.5 = 6rem + 1.5rem gap.
 */
function getWidth(count: number) {
  if (count < 5) {
    return `${count * 7.5 - 1.5}rem`;
  }
  return `${Math.ceil(count / 2) * 7.5 - 1.5}rem`;
}

export function Table({ clients, hands, stage }: Props) {
  const width = getWidth(Object.keys(clients).length);

  return (
    <Flex gap="1.5rem" justify="center" wrap="wrap" style={{ width }}>
      {Object.keys(clients).map((key) => (
        <Player
          key={key}
          name={clients[key].name}
          hand={hands[key]}
          covered={stage === "voting"}
        />
      ))}
    </Flex>
  );
}
