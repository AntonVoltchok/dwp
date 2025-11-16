import styles from '../styles/App.module.scss';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import Treatment from '../components/Treatment';

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <Hero />
      <Intro /> 
      <Services />
      <Treatment />
    </div>
  );
}

export default Home;
