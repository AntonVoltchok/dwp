import styles from '../styles/nav.module.scss';
import { useIsMobile } from '../utils/device';
import { ReactComponent as MenuIcon } from '../assets/menuIcon.svg';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';

const Nav = () => {
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);

    const links = <>
        <div>About</div>
        <div>Services</div>
        <div>Treatment</div>
        <div>Contact</div>
    </>

    // Handle scroll direction detection for mobile sticky nav
    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show nav when scrolling up, hide when scrolling down
            if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                setIsNavVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down and past initial threshold
                setIsNavVisible(false);
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);


    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navClasses = `${styles.navContainerStatic} ${isMobile && isNavVisible ? styles.navVisible : ''} ${isMobile && !isNavVisible ? styles.navHidden : ''}`;

    return (
        <>
            <div className={navClasses}>
                <div className={styles.logoContainer}>
                    <img src={logo}/>
                </div>
                {isMobile ? (
                    <div className={styles.menuIcon} onClick={toggleMenu}>
                        <MenuIcon />
                    </div>
                ) : (
                    <div className={styles.menuContainer}>
                        {links}
                    </div>
                )}
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobile && isMenuOpen && (
                <div 
                    className={styles.mobileMenuOverlay}
                    onClick={(e) => {
                        // Close menu if clicking directly on overlay background (not on content)
                        if (e.target === e.currentTarget) {
                            closeMenu();
                        }
                    }}
                >
                    <div className={styles.mobileMenuContent}>
                        <button className={styles.closeButton} onClick={closeMenu} aria-label="Close menu">
                            ×
                        </button>
                        <div className={styles.mobileMenuLinks}>
                            <div className={styles.mobileMenuItem} onClick={closeMenu}>About</div>
                            <div className={styles.mobileMenuItem} onClick={closeMenu}>Services</div>
                            <div className={styles.mobileMenuItem} onClick={closeMenu}>Treatment</div>
                            <div className={styles.mobileMenuItem} onClick={closeMenu}>Contact</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;