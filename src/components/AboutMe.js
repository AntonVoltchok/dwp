import Heading from './Heading';
import styles from '../styles/aboutme.module.scss';
import content from '../utils/content';

const AboutMe = () => {
    return (
        <div className={styles.aboutMeContainer} id="about">
            <Heading>About Me</Heading>
            <section className={styles.aboutSection}>
                {content.aboutMe.firstPart}
            </section>
            <section className={styles.aboutSection}>
                {content.aboutMe.secondPart}
            </section>
            <section className={styles.aboutSection}>
                {content.aboutMe.thirdPart}
            </section>
        </div>
    )
}

export default AboutMe;