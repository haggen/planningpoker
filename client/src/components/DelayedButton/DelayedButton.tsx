import { ComponentProps, MouseEvent, useState } from "react";
import { useInterval } from "react-use";
import { Button } from "src/components/Button";

type Props = ComponentProps<typeof Button> & {
  delay: number;
};

export const DelayedButton = ({ delay, onClick, ...props }: Props) => {
  const [countdown, setCountdown] = useState(0);

  const isCounting = countdown > 0;

  useInterval(
    () => {
      setCountdown((n) => (n > 0 ? n - 1 : 0));
    },
    isCounting ? 1000 : null
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isCounting) {
      return;
    }
    setCountdown(delay);

    setTimeout(() => {
      onClick?.(e);
    }, delay * 1000);
  };

  const children = isCounting ? (
    <span style={{ width: "3rem", textAlign: "center" }}>{countdown}</span>
  ) : (
    props.children
  );

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
