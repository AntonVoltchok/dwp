import content from '../utils/content';
import styles from '../styles/services.module.scss';
import Heading from './Heading';
import { useEffect, useState } from 'react';
import { useIsMobile } from '../utils/device';
import { 
  initHorizontalParallax, 
  destroyHorizontalParallax,
  initParallax,
  destroyParallax 
} from '../utils/parallax';
import { ReactComponent as ChevronIcon } from '../assets/down-chevron.svg';

const Services = () => {
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  useEffect(() => {
    // Initialize horizontal parallax on client only
    if (isMobile) {
      initHorizontalParallax(`.${styles.servicesContainer}`, 0.55);
    } else {
      initParallax(`.${styles.servicesContainer}`, 0.55);
    }
    
    return () => isMobile ? destroyHorizontalParallax() : destroyParallax();
  }, [styles.servicesContainer, isMobile]);

  const toggleAccordion = (index) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const serviceBlock = (obj) => {
    return (
      <div key={obj.title} className={styles.service}>
        <div className={styles.serviceTitle}>{obj.title}</div>
        <div className={styles.serviceDesc}>{obj.description}</div>
      </div>
    );
  }

  const mobileAccordionView = () => {
    return (
      <div className={styles.accordionContainer}>
        {content?.services?.map((service, index) => {
          const isOpen = openItems.has(index);
          return (
            <div key={service.title} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
              >
                <span className={styles.accordionTitle}>{service.title}</span>
                <ChevronIcon 
                  className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}
                />
              </button>
              <div 
                className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : ''}`}
              >
                <div className={styles.accordionDescription}>{service.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  return (
    <div className={styles.servicesContainer} id="services">
      <Heading>Services</Heading>
      {isMobile ? mobileAccordionView() :
        <div className={styles.servicesContent}>
        {content?.services?.map(service => serviceBlock(service))}
      </div>}
    </div>
  );
}
// a48a6a
export default Services;