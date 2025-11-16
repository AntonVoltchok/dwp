import styles from '../styles/App.module.scss';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import { useIsMobile } from '../utils/device';

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <Hero />
      <Intro /> 
      <Services />
    </div>
  );
}

export default Home;
