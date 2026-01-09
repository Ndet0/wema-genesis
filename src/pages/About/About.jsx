import { useState } from 'react';
import './About.css';

const IMPACT_STATS = [
  { number: '1,000+', label: 'Families Supported', icon: '👨‍👩‍👧‍👦' },
  { number: '50+', label: 'Communities Reached', icon: '🌍' },
  { number: '$100K+', label: 'Funds Distributed', icon: '💰' },
  { number: '100+', label: 'Projects Completed', icon: '✅' },
];

const CORE_VALUES = [
  {
    title: 'Transparency',
    description: 'We\'re accountable for every donation and resource, providing regular updates to our donors.',
    icon: '🔍',
  },
  {
    title: 'Compassion',
    description: 'We approach every situation with empathy, respect, and genuine care for those we serve.',
    icon: '❤️',
  },
  {
    title: 'Sustainability',
    description: 'We build long-term solutions that empower communities rather than create dependency.',
    icon: '🌱',
  },
  {
    title: 'Community-First',
    description: 'We listen to and work directly with the communities we serve, respecting their needs and wisdom.',
    icon: '🤝',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Sarah Johnson',
    role: 'Executive Director',
    bio: 'Visionary leader with 15+ years in nonprofit management.',
    icon: '👩‍💼',
  },
  {
    name: 'James Kipchoge',
    role: 'Community Coordinator',
    bio: 'Passionate advocate for grassroots development across East Africa.',
    icon: '👨‍💼',
  },
  {
    name: 'Maria Garcia',
    role: 'Finance Manager',
    bio: 'Ensures fiscal responsibility and transparency in all operations.',
    icon: '👩‍💻',
  },
  {
    name: 'David Okonkwo',
    role: 'Programs Director',
    bio: 'Designs and oversees all charitable initiatives and partnerships.',
    icon: '👨‍🔬',
  },
];

function About() {
  const [expandedValue, setExpandedValue] = useState(null);

  return (
    <section id="about" className="about">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h2>About WEMA</h2>
          <p>Transforming lives through compassion, transparency, and community-driven solutions</p>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              WEMA Charity Foundation is dedicated to transforming lives by providing essential 
              support to vulnerable communities. We believe that everyone deserves access to 
              education, healthcare, and basic necessities, regardless of their economic status.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-icon">🌟</div>
            <h3>Our Vision</h3>
            <p>
              A world where every community has the resources and support to thrive, where 
              poverty is not a barrier to opportunity, and where human dignity is honored 
              and celebrated.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="impact-section">
          <h3>Our Impact by Numbers</h3>
          <div className="stats-grid">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="story-section">
          <h3>Our Story</h3>
          <div className="story-content">
            <p>
              Founded with a vision to make meaningful impact at the grassroots level, WEMA 
              began as a small initiative to help underprivileged children access education. 
              What started as one teacher and a handful of students in a community center has 
              grown into a comprehensive charitable organization serving over 50 communities 
              across East Africa.
            </p>
            <p>
              Today, we work directly with communities to identify needs and implement sustainable 
              solutions. From educational programs to emergency relief, healthcare initiatives to 
              livelihood training, we're committed to changing lives, one doorstep at a time. 
              Every project is designed in partnership with the communities we serve, ensuring 
              that our interventions are culturally appropriate and genuinely impactful.
            </p>
            <p>
              Our success is measured not just in numbers, but in the stories of transformation—
              children completing their education, families achieving food security, and communities 
              gaining the tools to build their own futures.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="values-section">
          <h3>Our Core Values</h3>
          <div className="values-grid">
            {CORE_VALUES.map((value, index) => (
              <button
                key={index}
                className={`value-card ${expandedValue === index ? 'expanded' : ''}`}
                onClick={() => setExpandedValue(expandedValue === index ? null : index)}
              >
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <h3>Join Our Mission</h3>
          <p>Be part of the change. Support WEMA and help us transform more lives.</p>
          <button className="btn btn-primary" onClick={() => document.getElementById('donation').scrollIntoView({ behavior: 'smooth' })}>
            Make a Donation
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;