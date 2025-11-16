import content from '../utils/content';
import styles from '../styles/services.module.scss';
import Heading from './Heading';

const Services = () => {
  const serviceBlock = (obj) => {
    return (
      <div key={obj.title} className={styles.service}>
        <div className={styles.serviceTitle}>{obj.title}</div>
        <div className={styles.serviceDesc}>{obj.description}</div>
      </div>
    );
  }
  
  return (
    <div className={styles.servicesContainer}>
      <Heading>Services</Heading>
      <div className={styles.servicesContent}>
        {content?.services?.map(service => serviceBlock(service))}
      </div>
    </div>
  );
}
// a48a6a
export default Services;