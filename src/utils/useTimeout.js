import { useRef, useEffect } from 'react';

/**
 * React hook to delay a function being called by a given delay amount.
 * Works by creating a ref to a setTimeout() function call to the DOM and
 * waiting for the timer to end before firing the callback. if multiple
 * timouts are made at once, the hook will remove all previous timeouts
 * and only allow one at a time.
 * @param {function} callback The function to call once the delay ends
 * @param {millisecond} delay time to delay function call
 */
export default function useTimeout(callback, delay) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const timeout = timeoutRef.current;
    if (timeout) {
      clearTimeout(timeout);
    }
  }, []);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callback, delay);
  };
}
