import content from '../utils/content';
import styles from '../styles/intro.module.scss';
import { useIsMobile } from '../utils/device';

const Intro = () => {
  const isMobile = useIsMobile();
  const line = <div className={styles.quoteLine} />
  const contentMobile = (
    <div className={styles.exploreSectionMb}>
      <div className={styles.exploreContentMb}>
        <p>{content.description}</p>
      </div>
      <div className={styles.officeImgMb} aria-hidden='true' />
      <div className={styles.quoteCardMb}>
        <h4>{content.quote}</h4>
        <p>{content.quoteAuthor}</p>
      </div>
    </div>
  );
  const contentDesktop = (
    <div className={styles.exploreSection}>
      <div className={styles.quoteContainer}>
        {line}
        <div className={styles.quote}>
          <div>{content.quote}</div>
          <p>{content.quoteAuthor}</p>
        </div>
        {line}
      </div>
      <div className={styles.contentImgContainer}>
        <div className={styles.exploreContent}>
          <p>{content.description}</p>
        </div>
        <div className={styles.officeImg} aria-hidden='true' />
      </div>
    </div>
  )

  return isMobile ? contentMobile : contentDesktop;
}

export default Intro;
