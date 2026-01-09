import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className={styles.logoText}>WEMA</span>
            </div>
            <p className={styles.tagline}>
              Changing lives, one doorstep at a time
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="/" className={styles.link}>Home</a></li>
              <li><a href="/about" className={styles.link}>About Us</a></li>
              <li><a href="/donate" className={styles.link}>Donate</a></li>
              <li><a href="/contact" className={styles.link}>Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contact}>
            <h4 className={styles.heading}>Contact Us</h4>
            <address className={styles.address}>
              <p>Email: info@wema.org</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>

          {/* Social Links */}
          <div className={styles.social}>
            <h4 className={styles.heading}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} WEMA Charity Foundation. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

