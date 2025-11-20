import './Header.css';
import { useState, useEffect } from 'react';

// Donation URLs for the select dropdown
const DONATION_URLS = {
  paypal: 'https://www.paypal.com',
  stripe: 'https://www.stripe.com',
};

// Header component: shows logo, navigation links and a mobile hamburger menu.
// - Highlights the active section based on scroll position
// - Provides a hamburger menu for small screens which toggles the nav
function Header() {
  // activeSection: which page section is currently active (home/about/projects/contact)
  const [activeSection, setActiveSection] = useState('home');
  // social: value for the socials <select> control
  const [social, setSocial] = useState('');
  // isMenuOpen: whether the mobile slide-in menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Opens the selected social/donation link in a new tab
  const handleSocialChange = (e) => {
    const url = e.target.value;
    if (url) window.open(url, '_blank');
    setSocial(''); // Reset dropdown after selection
  };

  // Close menu when a nav link is clicked (used on mobile)
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Helper to render nav links consistently
  const renderNavLink = (href, label, sectionId) => (
    <li>
      <a
        href={href}
        className={activeSection === sectionId ? 'active' : ''}
        onClick={() => {
          setActiveSection(sectionId);
          handleNavClick();
        }}
      >
        {label}
      </a>
    </li>
  );

  // Detect which section is currently visible and update activeSection.
  // This uses window.scrollY and the DOM to find section positions. It runs
  // on scroll and updates the highlighted link in the nav. The offset (-120)
  // accounts for the fixed header height so the correct section becomes active
  // when it appears below the header.
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // offset for header height
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      // If near the top, mark "home" as active
      if (window.scrollY < 100) {
        current = 'home';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <h1 className="logo">WEMA</h1>

      {/* Hamburger menu button: visible on small screens only (CSS controls visibility) */}
      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation. When isMenuOpen is true the CSS 'open' class slides the menu in on mobile */}
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          {renderNavLink('#home', 'Home', 'home')}
          {renderNavLink('#about', 'About', 'about')}
          {renderNavLink('#donation', 'Donate', 'donation')}
          {renderNavLink('#contact', 'Contact', 'contact')}
          {renderNavLink('#admin', 'Admin', 'admin')}
          <li className="nav-right-item">
            <select
              className="donate-select"
              value={social}
              onChange={handleSocialChange}
              aria-label="Select donation method"
            >
              <option value="">Quick Donate</option>
              <option value="https://www.paypal.com">PayPal</option>
              <option value="https://www.stripe.com">Debit or Credit Card</option>
              <option value="https://www.stripe.com">Stripe</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
