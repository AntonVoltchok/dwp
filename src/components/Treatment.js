import content from '../utils/content';
import styles from '../styles/treatment.module.scss';
import Heading from './Heading';
import { useEffect } from 'react';
import { initDiagonalParallax, destroyDiagonalParallax } from '../utils/parallax';

const Treatment = () => {
  useEffect(() => {
    initDiagonalParallax(`.${styles.treatmentContainer}`, 0.7);
    return () => destroyDiagonalParallax();
  }, [styles.treatmentContainer]);
  
  const treatmentBlock = (obj) => {
    return (
      <div key={obj.title} className={styles.treatment}>
        <div className={styles.treatmentTitle}>{obj.title}</div>
        <div className={styles.treatmentDesc}>{obj.description}</div>
      </div>
    );
  }

  return (
    <div className={styles.treatmentContainer}>
      <Heading>Treatment</Heading>
      <div className={styles.treatmentsContent}>
        {content?.treatment?.map(treatment => treatmentBlock(treatment))}
      </div>
    </div>
  );
}
// a48a6a
export default Treatment;