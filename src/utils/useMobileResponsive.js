import { useState, useEffect } from 'react';

// NOTE: These are the breakpoints used in Bootstrap v4.0.0 as seen in
// the documentation (https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)
const breakpoints = {
  extraSmall: {
    maxWidth: 575.98,
  },
  small: {
    minWidth: 576,
    maxWidth: 767.98,
  },
  medium: {
    minWidth: 768,
    maxWidth: 991.98,
  },
  large: {
    minWidth: 992,
    maxWidth: 1199.98,
  },
  extraLarge: {
    minWidth: 1200,
  },
};

/**
 * A react hook used to determine if the current window is mobile or not.
 * returns true if the window is of mobile size.
 */
export default function useMobileResponsive(breakpoint) {
  const [isMobileWindow, setIsMobileWindow] = useState();
  const checkForMobile = () => {
    setIsMobileWindow(window.matchMedia(`(max-width: ${breakpoint || breakpoints.small.maxWidth}px)`).matches);
  };
  useEffect(() => {
    checkForMobile();
    window.addEventListener('resize', checkForMobile);
    // return this function here to clean up the event listener
    return () => window.removeEventListener('resize', checkForMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isMobileWindow;
}
