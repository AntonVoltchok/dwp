import styles from '../styles/nav.module.scss';
import { useIsMobile } from '../utils/device';
import { ReactComponent as MenuIcon } from '../assets/menuIcon.svg';
import logo from '../assets/logo-v1.png';
import { useState, useEffect, useRef, useCallback } from 'react';

const navItems = [
    { label: 'Home', targetId: 'home' },
    { label: 'Services', targetId: 'services' },
    { label: 'Treatment', targetId: 'treatment' },
    { label: 'About Me', targetId: 'about' },
    { label: 'Contact', targetId: 'contact' },
];

const Nav = () => {
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);

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

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const scrollToSection = useCallback((targetId) => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        const section = document.getElementById(targetId);
        if (!section) return;

        const yOffset = isMobile ? 80 : 0;
        const scrollPosition = window.pageYOffset ?? window.scrollY ?? 0;
        const elementTop = section.getBoundingClientRect().top + scrollPosition;
        const targetPosition = elementTop - yOffset;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }, [isMobile]);

    const handleNavItemClick = useCallback((targetId) => {
        if (isMobile) {
            closeMenu();
            requestAnimationFrame(() => scrollToSection(targetId));
        } else {
            scrollToSection(targetId);
        }
    }, [closeMenu, isMobile, scrollToSection]);

    const handleKeyDown = useCallback((event, targetId) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleNavItemClick(targetId);
        }
    }, [handleNavItemClick]);

    const handleMenuIconKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    }, [toggleMenu]);

    const navClasses = `${styles.navContainerStatic} ${isMobile && isNavVisible ? styles.navVisible : ''} ${isMobile && !isNavVisible ? styles.navHidden : ''}`;

    return (
        <>
            <div className={navClasses}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="De Waal Psychology logo" />
                </div>
                {isMobile ? (
                    <div 
                        className={styles.menuIcon} 
                        onClick={toggleMenu} 
                        role="button" 
                        tabIndex={0}
                        onKeyDown={handleMenuIconKeyDown}
                        aria-label="Toggle menu"
                    >
                        <MenuIcon />
                    </div>
                ) : (
                    <div className={styles.menuContainer}>
                        {navItems.map(({ label, targetId }) => (
                            <div
                                key={targetId}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleNavItemClick(targetId)}
                                onKeyDown={(event) => handleKeyDown(event, targetId)}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobile && isMenuOpen && (
                <div 
                    className={styles.mobileMenuOverlay}
                    onClick={closeMenu}
                >
                    <div 
                        className={styles.mobileMenuContent}
                        onClick={(e) => {
                            closeMenu();
                            e.stopPropagation();
                        }}
                    >
                        <button className={styles.closeButton} onClick={closeMenu} aria-label="Close menu">
                            ×
                        </button>
                        <div className={styles.mobileMenuLinks}>
                            {navItems.map(({ label, targetId }) => (
                                <div
                                    key={targetId}
                                    className={styles.mobileMenuItem}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleNavItemClick(targetId)}
                                    onKeyDown={(event) => handleKeyDown(event, targetId)}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;