import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About WEMA Charity Foundation</h2>
        
        <div className="about-content">
          <div className="about-mission">
            <h3>Our Mission</h3>
            <p>
              WEMA Charity Foundation is dedicated to transforming lives by providing 
              essential support to vulnerable communities. We believe that everyone deserves 
              access to education, healthcare, and basic necessities, regardless of their 
              economic status.
            </p>
          </div>

          <div className="about-story">
            <h3>Our Story</h3>
            <p>
              Founded with a vision to make meaningful impact at the grassroots level, 
              WEMA works directly with communities to identify needs and implement sustainable 
              solutions. From educational programs to emergency relief, we're committed to 
              changing lives, one doorstep at a time.
            </p>
          </div>

          <div className="about-impact">
            <h3>Our Impact</h3>
            <div className="impact-stats">
              <div className="stat">
                <h4>1,000+</h4>
                <p>Families Supported</p>
              </div>
              <div className="stat">
                <h4>50+</h4>
                <p>Communities Reached</p>
              </div>
              <div className="stat">
                <h4>$100K+</h4>
                <p>Funds Distributed</p>
              </div>
            </div>
          </div>

          <div className="about-values">
            <h3>Our Core Values</h3>
            <ul>
              <li><strong>Transparency:</strong> We're accountable for every donation and resource.</li>
              <li><strong>Compassion:</strong> We approach every situation with empathy and respect.</li>
              <li><strong>Sustainability:</strong> We build long-term solutions, not quick fixes.</li>
              <li><strong>Community-First:</strong> We listen to and work with the communities we serve.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
