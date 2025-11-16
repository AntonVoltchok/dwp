import styles from '../styles/App.module.scss';
import { useIsMobile } from '../utils/device';

const Heading = (props) => {
  const isMobile = useIsMobile();
  const line = <div className={styles.line} />;

  if (isMobile) {
    return (
      <div className={styles.lineContainerMb}>
        <div className={styles.lineHeadingMb}>{props.children}</div>
        <div className={styles.lineMb} />
      </div>
    );
  }

  return (
    <div className={styles.lineContainer}>
      {line}
      <div className={styles.lineHeading}>{props.children}</div>
      {line}
    </div>
  );
}

export default Heading;