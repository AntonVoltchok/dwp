// Small device detection helpers used across the app.
// Exports:
// - isMobile(userAgent?: string): boolean
// - isDesktop(userAgent?: string): boolean
// - useIsMobile(): React hook that returns boolean and updates on resize

export function isMobile(userAgent) {
  const ua = (userAgent || (typeof navigator !== 'undefined' && navigator.userAgent) || '').toLowerCase();
  // Common mobile indicators
  return /iphone|ipod|android|blackberry|bb10|mini|windows ce|palm|mobile|tablet|opera mini/i.test(ua);
}

export function isDesktop(userAgent) {
  return !isMobile(userAgent);
}

// Hook version for React components (lazy-import React when used to avoid runtime errors in non-browser envs)
export function useIsMobile() {
  // dynamic import of React to avoid top-level dependency when this file is imported in non-React contexts
  const React = require('react');
  const { useState, useEffect } = React;

  const get = () => {
    if (typeof window === 'undefined') return false;
    return isMobile(window.navigator && window.navigator.userAgent);
  };

  const [mobile, setMobile] = useState(get());

  useEffect(() => {
    function onResize() {
      // You may prefer matchMedia in some projects; this keeps detection consistent with user agent.
      setMobile(get());
    }

    window.addEventListener('resize', onResize);
    // also listen for orientation change
    window.addEventListener('orientationchange', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return mobile;
}
