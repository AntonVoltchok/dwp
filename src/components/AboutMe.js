import Heading from './Heading';
import styles from '../styles/aboutme.module.scss';
import content from '../utils/content';
import { useIsMobile } from '../utils/device';
import { useNavigate } from 'react-router-dom';

const AboutMe = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const handleBackgroundClick = () => {
        navigate('/background-experience');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBackgroundClick();
        }
    };

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
                    {isMobile && <div className={styles.aboutImgMb} aria-hidden='true' />}
                    <br/>
                    <section className={styles.aboutSection}>
                        {content.aboutMe.secondPart}
                    </section>
                    <br/>
                    <div 
                        className={styles.backgroundLink}
                        onClick={handleBackgroundClick}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={0}
                    >
                        View Background & Experience
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AboutMe;