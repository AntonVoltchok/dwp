import content from '../utils/content';
import styles from '../styles/hero.module.scss';
import { useEffect, useRef } from 'react';
import { useIsMobile } from '../utils/device';

const Hero = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const bgEl = container.querySelector(`.${styles.heroBg}`);
    if (!bgEl) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elHeight = rect.height || container.offsetHeight;

        const elCenter = rect.top + elHeight / 2;
        const viewportCenter = windowHeight / 2;
        const maxDistance = viewportCenter + elHeight / 2;
        const normalized = Math.max(-1, Math.min(1, (elCenter - viewportCenter) / maxDistance));

        const maxTranslate = elHeight * (isMobile ? 0.18 : 0.3);
        const translate = -normalized * maxTranslate;
        bgEl.style.transform = `translate3d(0, ${translate}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div className={styles.heroContainer} id="home" ref={containerRef}>
      {/* absolutely-positioned inner background for transform-based parallax */}
      <div className={styles.heroBg} aria-hidden='true' />
      <header className={styles.heroBanner}>
        <h1 className={styles.heroText}>{content.title}</h1>
        <h4 className={styles.heroSubText}>
          Psychotherapy and <br /> Assessment Services
        </h4>
      </header>
    </div>
  );
};

export default Hero;
