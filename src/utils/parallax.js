// Lightweight parallax helper that adjusts background-position on scroll
// Usage: import { initParallax, destroyParallax, initHorizontalParallax, destroyHorizontalParallax, initDiagonalParallax, destroyDiagonalParallax } from '../utils/parallax';

let rafId = null;
let handler = null;
let bgEl = null;

// Horizontal parallax instance variables (separate from vertical)
let horizontalRafId = null;
let horizontalHandler = null;

// Diagonal parallax instance variables
let diagonalRafId = null;
let diagonalHandler = null;

function hasReducedMotionPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function prefersLightweightParallax() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport = window.innerWidth <= 768;
  return coarsePointer || narrowViewport;
}

function getEffectiveSpeed(baseSpeed) {
  if (prefersLightweightParallax()) {
    return baseSpeed * 0.65;
  }
  return baseSpeed;
}

// Desktop throttle (~40–45fps) and mobile throttle (~45fps)
// Desktop runs slightly less often to reduce CPU while remaining smooth.
const DEFAULT_THROTTLE = 24;      // ≈ 41fps
const LIGHTWEIGHT_THROTTLE = 22;  // ≈ 45fps

function getThrottleDelay() {
  return prefersLightweightParallax() ? LIGHTWEIGHT_THROTTLE : DEFAULT_THROTTLE;
}

function now() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }
  return Date.now();
}

function throttle(fn, delay = DEFAULT_THROTTLE) {
  let lastCall = 0;
  let timeoutId = null;

  return (...args) => {
    const timestamp = now();
    const remaining = delay - (timestamp - lastCall);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = timestamp;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  };
}

// selectorOrElement can be a CSS selector string or a DOM element
export function initParallax(selectorOrElement = '.hero-container', speed = 0.5) {
  if (typeof window === 'undefined') return;

  const el = typeof selectorOrElement === 'string'
    ? document.querySelector(selectorOrElement)
    : selectorOrElement;
  if (!el) return;

  const effectiveSpeed = getEffectiveSpeed(speed);

  // Cache the background element - search for any child with data-parallax-bg attribute
  bgEl = el.querySelector('[data-parallax-bg]');

  // on mobile browsers background-attachment: fixed is often ignored/torn; use JS fallback
  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elHeight = rect.height || el.offsetHeight;

      // compute element center relative to viewport center in normalized range [-1, 1]
      const elCenter = rect.top + elHeight / 2;
      const viewportCenter = windowHeight / 2;
      const maxDistance = viewportCenter + elHeight / 2;
      const normalized = Math.max(-1, Math.min(1, (elCenter - viewportCenter) / maxDistance));

      // If there's an absolutely-positioned inner background, use transform for smoother animation
      if (bgEl) {
        const bgHeight = bgEl.offsetHeight || bgEl.getBoundingClientRect().height;
        let maxTranslate = Math.max(0, bgHeight - elHeight);
        // If heights are equal (e.g. some desktop layouts), fall back to a fraction of the element height
        if (maxTranslate === 0 && elHeight) {
          maxTranslate = elHeight * 0.25;
        }
        // translate in px, invert normalized so background moves slower than foreground
        const translate = -normalized * maxTranslate * effectiveSpeed;
        bgEl.style.transform = `translate3d(0, ${translate}px, 0)`;
      } else {
        // fallback to percentage-based background-position when no inner bg element
        let posPercent = 50 + normalized * effectiveSpeed * 50;
        posPercent = Math.max(0, Math.min(100, posPercent));
        el.style.backgroundPosition = `center ${posPercent}%`;
      }
    });
  }

  handler = throttle(onScroll, getThrottleDelay());
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler);
  // initialize
  handler();
}

export function destroyParallax() {
  if (typeof window === 'undefined') return;
  window.removeEventListener('scroll', handler);
  window.removeEventListener('resize', handler);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  handler = null;
  bgEl = null;
}

// Horizontal parallax function - moves background image horizontally as user scrolls
export function initHorizontalParallax(selector = '.services-container', speed = 0.3) {
  if (typeof window === 'undefined') return;

  const el = document.querySelector(selector);
  if (!el) return;

  const effectiveSpeed = getEffectiveSpeed(speed);

  function onScroll() {
    if (horizontalRafId) cancelAnimationFrame(horizontalRafId);
    horizontalRafId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elHeight = rect.height || el.offsetHeight;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Calculate progress as element scrolls through viewport
      // Progress: 0 when element top enters viewport, 1 when element bottom leaves viewport
      let progress = 0;
      
      // Only calculate parallax when element is in or entering viewport
      if (elementBottom > 0 && elementTop < windowHeight) {
        // Element is in viewport
        // Calculate how much of the element + viewport height has been scrolled
        const scrollRange = windowHeight + elHeight;
        // Distance scrolled: from when top enters viewport (top = windowHeight) to when bottom leaves (bottom = 0)
        const scrolledDistance = windowHeight - elementTop;
        // Normalize to 0-1 range
        progress = Math.max(0, Math.min(1, scrolledDistance / scrollRange));
      } else if (elementTop >= windowHeight) {
        // Element hasn't entered viewport yet - keep at start position
        progress = 0;
      } else if (elementBottom <= 0) {
        // Element has completely left viewport - keep at end position
        progress = 1;
      }

      // Calculate horizontal background position
      // Start from right (100%) and move to left (0%) as user scrolls down
      const startPosition = 100; // Start at right
      const endPosition = 0; // End at left
      // Apply speed multiplier to control movement range
      const movementRange = (startPosition - endPosition) * effectiveSpeed;
      const currentPosition = startPosition - (progress * movementRange);
      
      // Clamp the position between 0% and 100%
      const clampedPosition = Math.max(0, Math.min(100, currentPosition));
      
      el.style.backgroundPositionX = `${clampedPosition}%`;
    });
  }

  horizontalHandler = throttle(onScroll, getThrottleDelay());
  window.addEventListener('scroll', horizontalHandler, { passive: true });
  window.addEventListener('resize', horizontalHandler);
  // initialize
  horizontalHandler();
}

export function destroyHorizontalParallax() {
  if (typeof window === 'undefined') return;
  if (horizontalHandler) {
    window.removeEventListener('scroll', horizontalHandler);
    window.removeEventListener('resize', horizontalHandler);
  }
  if (horizontalRafId) cancelAnimationFrame(horizontalRafId);
  horizontalRafId = null;
  horizontalHandler = null;
}

// Diagonal parallax function - moves background image diagonally from bottom left to top right
export function initDiagonalParallax(selector = '.treatment-container', speed = 0.3) {
  if (typeof window === 'undefined') return;

  const el = document.querySelector(selector);
  if (!el) return;

  const effectiveSpeed = getEffectiveSpeed(speed);

  function onScroll() {
    if (diagonalRafId) cancelAnimationFrame(diagonalRafId);
    diagonalRafId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elHeight = rect.height || el.offsetHeight;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Calculate progress as element scrolls through viewport
      // Progress: 0 when element top enters viewport, 1 when element bottom leaves viewport
      let progress = 0;
      
      // Only calculate parallax when element is in or entering viewport
      if (elementBottom > 0 && elementTop < windowHeight) {
        // Element is in viewport
        // Calculate how much of the element + viewport height has been scrolled
        const scrollRange = windowHeight + elHeight;
        // Distance scrolled: from when top enters viewport (top = windowHeight) to when bottom leaves (bottom = 0)
        const scrolledDistance = windowHeight - elementTop;
        // Normalize to 0-1 range
        progress = Math.max(0, Math.min(1, scrolledDistance / scrollRange));
      } else if (elementTop >= windowHeight) {
        // Element hasn't entered viewport yet - keep at start position
        progress = 0;
      } else if (elementBottom <= 0) {
        // Element has completely left viewport - keep at end position
        progress = 1;
      }

      // Calculate diagonal background position
      // Horizontal: from left (0%) to right (100%)
      // Vertical: from bottom (100%) to top (0%)
      const startX = 0; // Start at left
      const endX = 100; // End at right
      const startY = 100; // Start at bottom
      const endY = 0; // End at top
      
      // Apply speed multiplier to control movement range
      const movementRangeX = (endX - startX) * effectiveSpeed;
      const movementRangeY = (endY - startY) * effectiveSpeed;
      
      const currentX = startX + (progress * movementRangeX);
      const currentY = startY + (progress * movementRangeY);
      
      // Clamp the positions between 0% and 100%
      const clampedX = Math.max(0, Math.min(100, currentX));
      const clampedY = Math.max(0, Math.min(100, currentY));
      
      el.style.backgroundPosition = `${clampedX}% ${clampedY}%`;
    });
  }

  diagonalHandler = throttle(onScroll, getThrottleDelay());
  window.addEventListener('scroll', diagonalHandler, { passive: true });
  window.addEventListener('resize', diagonalHandler);
  // initialize
  diagonalHandler();
}

export function destroyDiagonalParallax() {
  if (typeof window === 'undefined') return;
  if (diagonalHandler) {
    window.removeEventListener('scroll', diagonalHandler);
    window.removeEventListener('resize', diagonalHandler);
  }
  if (diagonalRafId) cancelAnimationFrame(diagonalRafId);
  diagonalRafId = null;
  diagonalHandler = null;
}
