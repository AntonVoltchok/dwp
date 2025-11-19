import content from '../utils/content';
import styles from '../styles/hero.module.scss';
import { useEffect } from 'react';
import { initParallax, destroyParallax } from '../utils/parallax';
import { useIsMobile } from '../utils/device';
import bannerImg from '../assets/heroBanner.jpg';
import bannerImgMb from '../assets/heroBannerMb.jpg';

const Hero = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initialize parallax on client only
    initParallax(`.${styles.heroContainer}`, (isMobile ? 0.5 : 0.35));
    return () => destroyParallax();
  }, [isMobile, styles.heroContainer]);

  return (
    <div className={styles.heroContainer}>

      {/* absolutely-positioned inner image for transform-based parallax */}
      <div className={styles.heroBg} data-parallax-bg aria-hidden='true'>
        {
          isMobile ?
            <img src={bannerImgMb} alt="" /> :
            <img src={bannerImg} alt="" />
        }
      </div>
      <header className={styles.heroBanner}>
        <h1 className={styles.heroText}>{content.title}</h1>
        <h4 className={styles.heroSubText}>
          Psychotherapy and <br /> Assessment Services
        </h4>
      </header>
    </div>
  );
}

export default Hero;
