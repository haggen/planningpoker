import { ElementType, forwardRef } from "react";

import * as classes from "./style.module.css";

import { ClassList } from "~/src/lib/classList";
import { PolymorphicPropsWithRef, PolymorphicRef } from "~/src/lib/shared";

type Props = {
  variant?: "default" | "hollow" | "ghost";
};

function Button<E extends "button" | "a" = "button">(
  { as, variant = "default", ...props }: PolymorphicPropsWithRef<E, Props>,
  ref: PolymorphicRef<E>
) {
  const Component = as ?? ("button" as ElementType);
  const classList = new ClassList();
  classList.add(classes.button);
  classList.add(classes[variant]);
  props.type ??= "button";
  props.className ??= classList.toString();
  return <Component ref={ref} {...props} />;
}

// Fix the type of the forwarded component.
const forwardRefButton = forwardRef(Button) as typeof Button;
export { forwardRefButton as Button };
