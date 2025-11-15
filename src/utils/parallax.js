// Lightweight parallax helper that adjusts background-position on scroll
// Usage: import { initParallax, destroyParallax } from '../utils/parallax';

let rafId = null;
let handler = null;

export function initParallax(selector = '.hero-container', speed = 0.5) {
  if (typeof window === 'undefined') return;

  const el = document.querySelector(selector);
  if (!el) return;

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
      const bgEl = el.querySelector('.hero-bg');
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
}
