/**
 * Get a throttled version of a function that run at most once every `delay` milliseconds.
 */
export function throttled<P extends unknown[], R>(
  func: (...args: P) => R,
  delay: number
) {
  const ref = { time: 0, value: null } as {
    time: number;
    value: R;
  };
  return (...args: P) => {
    const now = Date.now();
    if (now > ref.time + delay) {
      ref.time = now;
      ref.value = func(...args);
    }
    return ref.value;
  };
}
