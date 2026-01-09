import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '/', ariaLabel: 'Navigate to home' },
  { id: 'about', label: 'About', path: '/about', ariaLabel: 'Navigate to about' },
  { id: 'donation', label: 'Donate', path: '/donate', ariaLabel: 'Navigate to donation' },
  { id: 'contact', label: 'Contact', path: '/contact', ariaLabel: 'Navigate to contact' },
  { id: 'admin', label: 'Admin', path: '/admin', ariaLabel: 'Navigate to admin' },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Track current page/route
  useEffect(() => {
    const currentLink = NAV_LINKS.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveSection(currentLink.id);
    }
  }, [location.pathname]);

  // Combined scroll handler for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Update scrolled state
          setIsScrolled(scrollY > 10);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click or escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleInteraction = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'click' && menuRef.current?.contains(e.target)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [isMenuOpen]);

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

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <button
          className={styles.logo}
          onClick={() => handleNavigation('/')}
          aria-label="WEMA Charity Foundation - Go to home"
        >
          <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className={styles.logoText}>WEMA</span>
        </button>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop} aria-label="Main navigation">
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={() => handleNavigation(link.path)}
                  aria-label={link.ariaLabel}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <button 
          className={styles.btnDonate} 
          onClick={() => handleNavigation('/donate')}
          aria-label="Make a donation"
        >
          <svg className={styles.heartIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Donate
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.navMobile} ${isMenuOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileNavLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={() => handleNavigation(link.path)}
                aria-label={link.ariaLabel}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className={styles.mobileDonateWrapper}>
            <button
              className={styles.btnDonateMobile}
              onClick={() => handleNavigation('/donate')}
              aria-label="Make a donation"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              💚 Donate Now
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;