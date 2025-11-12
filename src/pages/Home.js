import { ParallaxBanner, ParallaxBannerLayer, Parallax } from 'react-scroll-parallax';
import bannerImg from '../assets/herobanner.png';
import '../styles/App.scss';



const Home = () => {

  const bannerStyles = {
    height: '92vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: 'bottom'
  }

  return (
    <div className='home-container'>
      <div className='nav-mobile'></div>


      <header className='hero-banner'>
        <ParallaxBanner style={bannerStyles}>
          <h1 className='hero-text'>De Waal Psychology</h1>
          <ParallaxBannerLayer
            image={bannerImg}
            speed={-20}
            style={{ aspectRatio: '1 / 3.2', backgroundPosition: 'bottom' }}
          />
        </ParallaxBanner>
      </header>
      <div className='explore-section'>
        
        <Parallax speed={-5}>
          <div className='explore-card'>
            <h2>EXPLORE WHAT’S NOT WORKING ANYMORE</h2>
            <p>At Alexandria Art Therapy, we don’t expect you to have all the answers. We know that stressful
              experiences are made even more stressful when we can’t find the words to describe them.
              That’s why we use art therapy and counseling to help you release, rewrite, and heal stories
              from the past. The creative process lets you transcend traditional talk therapy
              to get right to the heart of the matter and rediscover
              your own version of wellbeing.</p>
          </div>
        </Parallax>
      </div>

      {/* <img src={bannerImg} alt='hero-banner'/> */}

    </div >
  );
}

export default Home;
