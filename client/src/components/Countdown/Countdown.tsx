import { useEffect, useState } from "react";
import { useInterval } from "react-use";

type CountdownProps = {
  target: number;
};

export const Countdown = ({ target = 0 }: CountdownProps) => {
  const [remaining, setRemaining] = useState(0);

  useInterval(
    () => {
      setRemaining((r) => (r > 0 ? target - Date.now() : 0));
    },
    target >= Date.now() ? 1000 : null
  );

  useEffect(() => {
    setRemaining(target - Date.now());
  }, [target]);

  return <>{Math.round(remaining / 1000)}</>;
  // return <>{remaining}</>;
};
