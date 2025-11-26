import content from '../utils/content';
import styles from '../styles/treatment.module.scss';
import Heading from './Heading';
import { useIsMobile } from '../utils/device';
import { useEffect, useState } from 'react';
import { initDiagonalParallax, destroyDiagonalParallax } from '../utils/parallax';

const MAX_TREATMENT_CHARS = 150;

const Treatment = () => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    initDiagonalParallax(`.${styles.treatmentContainer}`, 0.9);
    return () => destroyDiagonalParallax();
  }, [styles.treatmentContainer]);

  const toggleExpanded = (index) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const getDisplayText = (text, isExpanded) => {
    if (!text) return '';
    if (isExpanded || text.length <= MAX_TREATMENT_CHARS) return text;
    return `${text.slice(0, MAX_TREATMENT_CHARS).trimEnd()}…`;
  };

  const treatmentBlockMobile = (obj, index) => {
    const isExpanded = expandedItems.has(index);
    const hasMore = obj.description && obj.description.length > MAX_TREATMENT_CHARS;

    return (
      <div key={obj.title} className={styles.treatment}>
        <div className={styles.treatmentTitle}>{obj.title}</div>
        <div className={`${styles.treatmentContent} ${isExpanded ? styles.treatmentContentOpen : ''}`}>
          <div className={styles.treatmentDesc}>
            {getDisplayText(obj.description, isExpanded)}
          </div>
          {hasMore && (
            <button
              type="button"
              className={styles.learnMoreButton}
              onClick={() => toggleExpanded(index)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const treatmentsHorizontalAccordion = () => {
    const items = content?.treatment || [];
    if (!items.length) return null;

    const activeItem = items[activeIndex] || items[0];

    return (
      <div className={styles.treatmentsHorizontal}>
        <div className={styles.treatmentTabs}>
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`${styles.treatmentTab} ${index === activeIndex ? styles.treatmentTabActive : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className={styles.treatmentPanel}>
          <div className={styles.treatmentPanelTitle}>{activeItem.title}</div>
          <div className={styles.treatmentPanelDesc}>{activeItem.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.treatmentContainer} id="treatment">
      <Heading>Treatment</Heading>
      {
        isMobile ? <div className={styles.treatmentsContent}>
        {content?.treatment?.map((treatment, index) => treatmentBlockMobile(treatment, index))}
      </div> : treatmentsHorizontalAccordion()
      }
    </div>
  );
}
// a48a6a
export default Treatment;