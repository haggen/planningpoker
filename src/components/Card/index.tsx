import * as classes from "./style.module.css";

import { ClassList } from "~/src/lib/classList";
import { Face } from "~/src/components/Face";
import { THand } from "~/src/lib/data";

type Props = {
  value: THand;
  selected?: boolean;
  onSelect?: (value: THand) => void;
};

export function Card({ value, selected = false, onSelect }: Props) {
  const handleClick = () => {
    onSelect?.(selected ? undefined : value);
  };

  const classList = new ClassList(classes.card);
  if (selected) {
    classList.add(classes.selected);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!onSelect}
      className={classList.toString()}
    >
      <Face value={value} />
    </button>
  );
}
