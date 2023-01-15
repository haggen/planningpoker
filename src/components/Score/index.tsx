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
      score[String(hand)] = (score[String(hand)] ?? 0) + 1;
    }
    return score;
  }, {} as Record<string, number>);

  const average = Object.keys(score).reduce((average, key) => {
    const value = parseFloat(key);
    if (average === 0) {
      return value;
    }
    return (average + value) / 2;
  }, 0);

  return (
    <Flex gap="1.5rem">
      {Object.keys(score).map((hand) => (
        <Flex key={hand} gap="0.5rem">
          <Card value={parseFloat(hand)} />×{score[hand]}
        </Flex>
      ))}
      <Flex gap="0.5rem" className={classes.average}>
        <Icon variant="approximate" />
        <output>{average}</output>
      </Flex>
    </Flex>
  );
}
