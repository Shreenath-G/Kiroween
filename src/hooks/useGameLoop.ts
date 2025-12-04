import { useEffect, useRef } from 'react';

export function useGameLoop(callback: () => void, interval: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
}
