import * as classes from "./style.module.css";

import { Flex } from "~/src/components/Flex";
import { Face } from "~/src/components/Face";
import { Icon } from "~/src/components/Icon";
import { ClassList } from "~/src/lib/classList";
import { THand } from "~/src/lib/data";

type Props = { name: string; hand: THand; covered: boolean };

function Hand({ hand, covered }: Pick<Props, "hand" | "covered">) {
  if (hand === "w") {
    return <Face value="w" />;
  }

  if (covered) {
    return (
      <Face>
        {hand ? <Icon variant="check" /> : <Icon variant="thinking" />}
      </Face>
    );
  }

  return <Face value={hand} />;
}

export function Player({ name, hand, covered }: Props) {
  const classList = new ClassList(classes.player);
  if (hand === "w") {
    classList.add(classes.faded);
  }

  return (
    <Flex
      as="figure"
      gap="0.5rem"
      align="center"
      direction="column"
      className={classList.toString()}
    >
      <Hand hand={hand} covered={covered} />
      <figcaption>{name}</figcaption>
    </Flex>
  );
}
