import Heading from './Heading';
import styles from '../styles/aboutme.module.scss';
import content from '../utils/content';
import { useIsMobile } from '../utils/device';

const AboutMe = () => {
    const isMobile = useIsMobile();
    return (
        <div className={styles.aboutMeContainer} id="about">
            <Heading>About Me</Heading>
            <div className={styles.aboutContentContainer}>
                {!isMobile && <div className={styles.aboutImg} aria-hidden='true' />}
                <div className={styles.aboutMeContentText}>
                    <section className={styles.aboutSection}>
                        {content.aboutMe.firstPart}
                    </section>
                    {isMobile && <br/>}
                    {isMobile && <div className={styles.aboutImg} aria-hidden='true' />}
                    <br/>
                    <section className={styles.aboutSection}>
                        {content.aboutMe.secondPart}
                    </section>
                </div>
            </div>
            
        </div>
    )
}

export default AboutMe;


{/* <section className={styles.aboutSection}>
                {content.aboutMe.thirdPart}
            </section> */}