import { ParallaxBanner, ParallaxBannerLayer, Parallax } from 'react-scroll-parallax';
import bannerImg from '../assets/herobanner.png';
import '../styles/App.scss';



const Home = () => {

const bannerStyles = { 
  height: '95vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

  return (
    <div className='home-container'>
      <header className='hero-banner'>
        <ParallaxBanner style={bannerStyles}>

        

            <h1 className='hero-text'>De Waal Psychology</h1>

      

          <ParallaxBannerLayer
            image={bannerImg}
            speed={-7} 
            className="aspect-[5/2]"
          />
        </ParallaxBanner>
      </header>
      {/* <img src={bannerImg} alt='hero-banner'/> */}
      <div className='more-content'>asdf</div>
    </div >
  );
}

export default Home;
