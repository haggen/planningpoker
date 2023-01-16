import { ReactNode } from "react";

import * as classes from "./style.module.css";

import { Icon } from "~/src/components/Icon";
import { THand } from "~/src/lib/data";

type Props =
  | {
      value: THand;
    }
  | { children: ReactNode };

function getContent(value: THand) {
  switch (value) {
    case "?":
      return <>?</>;
    case "w":
      return <Icon variant="eye" aria-label="Spectator" />;
    case 0.5:
      return <>½</>;
    case undefined:
      return <>-</>;
    default:
      return <>{value}</>;
  }
}

/**
 * Face value of a card.
 */
export function Face(props: Props) {
  return (
    <span className={classes.face}>
      {"value" in props ? getContent(props.value) : props.children}
    </span>
  );
}
