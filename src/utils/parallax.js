// Lightweight parallax helper that adjusts background-position on scroll
// Usage: import { initParallax, destroyParallax, initHorizontalParallax, destroyHorizontalParallax } from '../utils/parallax';

let rafId = null;
let handler = null;
let bgEl = null;

// Horizontal parallax instance variables (separate from vertical)
let horizontalRafId = null;
let horizontalHandler = null;

export function initParallax(selector = '.hero-container', speed = 0.5) {
  if (typeof window === 'undefined') return;

  const el = document.querySelector(selector);
  if (!el) return;

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
        const maxTranslate = Math.max(0, bgHeight - elHeight);
        // translate in px, invert normalized so background moves slower than foreground
        const translate = -normalized * maxTranslate * speed;
        bgEl.style.transform = `translate3d(0, ${translate}px, 0)`;
      } else {
        // fallback to percentage-based background-position when no inner bg element
        let posPercent = 50 + normalized * speed * 50;
        posPercent = Math.max(0, Math.min(100, posPercent));
        el.style.backgroundPosition = `center ${posPercent}%`;
      }
    });
  }

  handler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // initialize
  onScroll();
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
      const movementRange = (startPosition - endPosition) * speed;
      const currentPosition = startPosition - (progress * movementRange);
      
      // Clamp the position between 0% and 100%
      const clampedPosition = Math.max(0, Math.min(100, currentPosition));
      
      el.style.backgroundPositionX = `${clampedPosition}%`;
    });
  }

  horizontalHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // initialize
  onScroll();
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
