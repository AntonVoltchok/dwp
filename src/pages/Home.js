import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import bannerImg from '../assets/herobanner.png';
import '../styles/App.scss';



const Home = () => {

const bannerStyles = { 
  height: '80vh',
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
            speed={-40} 
            className="aspect-[3/2]"
          />
        </ParallaxBanner>
      </header>
      {/* <img src={bannerImg} alt='hero-banner'/> */}
      <div className='more-content'>asdf</div>
    </div >
  );
}

export default Home;
