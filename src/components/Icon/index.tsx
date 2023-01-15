import { ComponentProps } from "react";

import * as classes from "./style.module.css";
import Approximate from "./approximate.svg";
import Check from "./check.svg";
import Eye from "./eye.svg";
import Thinking from "./thinking.svg";

import { ClassList } from "~/src/lib/classList";

type Props = {
  variant: "approximate" | "check" | "eye" | "thinking";
} & ComponentProps<"svg">;

export function Icon({ variant, ...props }: Props) {
  const classList = new ClassList(classes.icon);
  if (props.className) {
    classList.add(props.className);
  }
  props.className = classList.toString();

  switch (variant) {
    case "approximate":
      return <Approximate {...props} />;
    case "check":
      return <Check {...props} />;
    case "eye":
      return <Eye {...props} />;
    case "thinking":
      return <Thinking {...props} />;
    default:
      return null;
  }
}
