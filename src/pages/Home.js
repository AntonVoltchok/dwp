import '../styles/app.scss';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import { useIsMobile } from '../utils/device';

const Home = () => {
  // const isMobile = useIsMobile();

  return (
    <div className='home-container'>
      <Hero />
      <Intro /> 
    </div >
  );
}

export default Home;
