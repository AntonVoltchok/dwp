import content from '../utils/content';
import styles from '../styles/treatment.module.scss';
import Heading from './Heading';

const Treatment = () => {
  
  const serviceBlock = (obj) => {
    return (
      <div key={obj.title} className={styles.service}>
        <div className={styles.serviceTitle}>{obj.title}</div>
        <div className={styles.serviceDesc}>{obj.description}</div>
      </div>
    );
  }

  return (
    <div className={styles.treatmentContainer}>
      <Heading>Treatment</Heading>
      <div className={styles.servicesContent}>
        {content?.treatment?.map(treatment => serviceBlock(treatment))}
      </div>
    </div>
  );
}
// a48a6a
export default Treatment;