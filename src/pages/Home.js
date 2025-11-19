import styles from '../styles/App.module.scss';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import Treatment from '../components/Treatment';
import Nav from '../components/Nav';
import AboutMe from '../components/AboutMe'
import Contact from '../components/Contact';

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <Nav/>
      <Hero />
      <Intro /> 
      <Services />
      <Treatment />
      <AboutMe />
      <Contact />
    </div>
  );
}

export default Home;
