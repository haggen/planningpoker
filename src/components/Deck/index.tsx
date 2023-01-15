import { Card } from "~/src/components/Card";
import { Flex } from "~/src/components/Flex";
import { THand } from "~/src/lib/data";

const deck = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, "?", "w"] as const;

type Props = {
  hand: THand;
  onSelect: (value: THand) => void;
};

export function Deck({ hand, onSelect }: Props) {
  return (
    <Flex as="menu" gap=".5rem" justify="center">
      {deck.map((value) => (
        <li key={value}>
          <Card value={value} selected={hand === value} onSelect={onSelect} />
        </li>
      ))}
    </Flex>
  );
}
