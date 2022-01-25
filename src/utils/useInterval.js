import { useEffect, useRef } from 'react';

/**
 * A custom hook used by the BulkEmailPendingTasks component to periodically make an API call on a regular interval.
 * This is lifted from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/.
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return null;
  }, [delay]);
}
