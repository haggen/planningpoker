import * as classes from "./style.module.css";

import { Card } from "~/src/components/Card";
import { Flex } from "~/src/components/Flex";
import { THands } from "~/src/lib/data";
import { Icon } from "~/src/components/Icon";

type Props = {
  hands: THands;
};

export function Score({ hands }: Props) {
  const score = Object.values(hands).reduce((score, hand) => {
    if (typeof hand === "number") {
      score.set(hand, (score.get(hand) ?? 0) + 1);
    }
    return score;
  }, new Map<number, number>());

  const average = Array.from(score.entries()).reduce(
    ([sum, total], [value, amount]) => {
      return [sum + value * amount, total + amount];
    },
    [0, 0]
  );

  return (
    <Flex gap="1.5rem" className={classes.score}>
      {Array.from(score.keys()).map((hand) => (
        <Flex key={hand} gap="0.5rem">
          <Card value={hand} />×{score.get(hand)}
        </Flex>
      ))}
      <Flex gap="0.5rem" className={classes.average}>
        <Icon variant="approximate" />
        <output>{(average[0] / average[1]).toFixed(2)}</output>
      </Flex>
    </Flex>
  );
}
