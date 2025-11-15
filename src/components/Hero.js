import content from '../utils/content';
import '../styles/hero.scss';
import { useEffect } from 'react';
import { initParallax, destroyParallax } from '../utils/parallax';
import { useIsMobile } from '../utils/device';
import bannerImg from '../assets/herobanner.png';

const Hero = () => {
    const isMobile = useIsMobile();
    useEffect(() => {
        // Initialize parallax on client only
        initParallax('.hero-container', (isMobile ? .5 : 0.35));
        return () => destroyParallax();
    }, [isMobile]);

  return (
    <div className='hero-container'>
      {/* absolutely-positioned inner image for transform-based parallax */}
      <div className='hero-bg' aria-hidden='true'>
        <img src={bannerImg} alt="" />
      </div>
      <header className='hero-banner'>
          <h1 className='hero-text'>{content.title}</h1>
          <h4 className='hero-sub-text'>
            Psychotherapy and <br/> Assessment Services
          </h4>
      </header>
    </div >
  );
}

export default Hero;
