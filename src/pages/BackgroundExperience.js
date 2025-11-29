import styles from '../styles/App.module.scss';
import Nav from '../components/Nav';
import Heading from '../components/Heading';
import backgroundExperienceStyles from '../styles/backgroundExperience.module.scss';
import content from '../utils/content';
import { useIsMobile } from '../utils/device';
import Contact from '../components/Contact';

const BackgroundExperience = () => {
    const isMobile = useIsMobile();
    const { backgroundAndExperience } = content;

    return (
        <div className={styles.homeContainer}>
            <Nav />
            <div className={backgroundExperienceStyles.container}>
                <Heading>Background & <br /> Experience</Heading>
                <div className={backgroundExperienceStyles.content}>
                    <br/>
                    <div className={backgroundExperienceStyles.backgroundSectionTop}>
                        <div className={backgroundExperienceStyles.topContentBlock}>
                            <section className={backgroundExperienceStyles.section}>
                                {backgroundAndExperience.firstPart}
                            </section>
                            <section className={backgroundExperienceStyles.section}>
                                {backgroundAndExperience.secondPart}
                            </section>
                        </div>
                        <div className={backgroundExperienceStyles.potImg} />
                    </div>

                    <div className={backgroundExperienceStyles.backgroundSectionTop}>
                        <div className={backgroundExperienceStyles.catImg} />
                        <div className={backgroundExperienceStyles.topContentBlock}>
                            <section className={backgroundExperienceStyles.section}>
                                {backgroundAndExperience.thirdPart}
                            </section>
                            <section className={backgroundExperienceStyles.section}>
                                {backgroundAndExperience.fourthPart}
                            </section>
                        </div>

                    </div>


                </div>
            </div>
            <Contact />
        </div>
    );
}

export default BackgroundExperience;

