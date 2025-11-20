import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home">
      <div className="home-container">
        <div className="home-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="home-hero">
            <h1 className="home-title">
              Welcome to <span className="highlight">WEMA</span>
            </h1>
            <p className="home-subtitle">
              Changing lives, one doorstep at a time
            </p>
            <p className="home-description">
              WEMA Charity Foundation is dedicated to transforming lives by providing 
              essential support to vulnerable communities. Join us in making a real difference.
            </p>
          </div>

          <div className="home-cta">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('donation')}
            >
              Donate Now
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>

          <div className="home-stats">
            <div className="stat-item">
              <h3 className="stat-number">1,000+</h3>
              <p className="stat-label">Families Supported</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Communities Reached</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">$100K+</h3>
              <p className="stat-label">Funds Distributed</p>
            </div>
          </div>
        </div>

        <div className="home-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}

export default Home;