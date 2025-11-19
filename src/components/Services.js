import content from '../utils/content';
import styles from '../styles/services.module.scss';
import Heading from './Heading';
import { useEffect } from 'react';
import { initHorizontalParallax, destroyHorizontalParallax } from '../utils/parallax';

const Services = () => {
  useEffect(() => {
    // Initialize horizontal parallax on client only
    initHorizontalParallax(`.${styles.servicesContainer}`, 0.55);
    return () => destroyHorizontalParallax();
  }, [styles.servicesContainer]);

  const serviceBlock = (obj) => {
    return (
      <div key={obj.title} className={styles.service}>
        <div className={styles.serviceTitle}>{obj.title}</div>
        <div className={styles.serviceDesc}>{obj.description}</div>
      </div>
    );
  }
  
  return (
    <div className={styles.servicesContainer} id="services">
      <Heading>Services</Heading>
      <div className={styles.servicesContent}>
        {content?.services?.map(service => serviceBlock(service))}
      </div>
    </div>
  );
}
// a48a6a
export default Services;