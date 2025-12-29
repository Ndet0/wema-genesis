import React, { useState } from 'react';
import './Contact.css';

const CONTACT_INFO = [
  {
    icon: '✉️',
    title: 'Email',
    value: 'festusndet00@gmail.com',
    link: 'mailto:info@wemacharity.org',
  },
  {
    icon: '📱',
    title: 'Phone',
    value: '+254 708 962 331',
    link: 'tel:+254708962331',
  },
  {
    icon: '📍',
    title: 'Office Address',
    value: 'Moi Avenue , Nairobi, Kenya 00100',
    link: null,
  },
  {
    icon: '🕐',
    title: 'Office Hours',
    value: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM',
    link: null,
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject.');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call - replace with actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>
            Have questions or want to partner with us? We'd love to hear from you. 
            Fill out the form or contact us directly.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-grid">
              {CONTACT_INFO.map((info, index) => (
                <div key={index} className="info-item">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-text">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} className="info-link">
                        {info.value}
                      </a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3>Send Us a Message</h3>

            {status === 'success' && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <div>
                  <strong>Message Sent!</strong>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <div>
                  <strong>Oops!</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {errorMessage && status !== 'success' && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (234) 567-890"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows="6"
                disabled={status === 'loading'}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner-mini"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;