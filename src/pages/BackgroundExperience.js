import Nav from '../components/Nav';
import Heading from '../components/Heading';
import backgroundExperienceStyles from '../styles/backgroundExperience.module.scss';
import content from '../utils/content';
import { useIsMobile } from '../utils/device';
import Contact from '../components/Contact';
import { useEffect } from 'react';

const BackgroundExperience = () => {
    const isMobile = useIsMobile();
    const { backgroundAndExperience } = content;

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav />
            <div className={backgroundExperienceStyles.bgExpWrapper}>
                {isMobile && <div className={backgroundExperienceStyles.mobileBg} />}
                <div className={backgroundExperienceStyles.container}>
                    <Heading noLine={isMobile}>Background & <br /> Experience</Heading>
                    <div className={backgroundExperienceStyles.content}>
                        <br />
                        <div className={backgroundExperienceStyles.backgroundSectionContainer}>
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

                        <div className={backgroundExperienceStyles.backgroundSectionContainer}>
                            {!isMobile && <div className={backgroundExperienceStyles.shelfImg} />}
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
        </>
    );
}

export default BackgroundExperience;

