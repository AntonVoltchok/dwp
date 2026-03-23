import Nav from '../components/Nav';
import emdrStyles from '../styles/emdr.module.scss';
import content from '../utils/content';
import Contact from '../components/Contact';
import { useEffect } from 'react';

const EMDR = () => {
    const { emdr } = content;

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav />
            <div className={emdrStyles.emdrHero}>
                <h1 className={emdrStyles.emdrHeroText}>EMDR</h1>
            </div>
            <div className={emdrStyles.emdrWrapper}>
                <div className={emdrStyles.emdrContainer}>
                    <div className={emdrStyles.emdrContent}>
                        <div className={emdrStyles.emdrSectionContainer}>
                            <div className={emdrStyles.emdrTopContentBlock}>
                                <section className={emdrStyles.emdrSection}>
                                    {emdr.partOne}
                                </section>
                                <section className={emdrStyles.emdrSection}>
                                    {emdr.partTwo}
                                </section>
                            </div>
                        </div>

                        <div className={emdrStyles.emdrSectionContainer}>
                            <div className={emdrStyles.emdrTopContentBlock}>
                                <section className={emdrStyles.emdrSection}>
                                    {emdr.partThree}
                                </section>
                                <section className={emdrStyles.emdrSection}>
                                    {emdr.partFour} {' '}
                                    <a
                                        className={emdrStyles.emdrExternalLink}
                                        href={emdr.hereLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        here
                                    </a>
                                    .
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <Contact />
            </div>
        </>
    );
};

export default EMDR;

