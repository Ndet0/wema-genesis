import React, { useState } from 'react';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section id="admin" className="admin-section">
      <div className="admin-container">
        <h2>Admin Dashboard</h2>
        <p className="admin-intro">
          📊 Dashboard for managing WEMA Charity Foundation operations and donations.
        </p>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'donations' ? 'active' : ''}`}
            onClick={() => setActiveTab('donations')}
          >
            Donations
          </button>
          <button
            className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
            onClick={() => setActiveTab('donors')}
          >
            Donors
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <h3>Dashboard Overview</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Donations</h4>
                  <p className="stat-value">$25,450</p>
                  <p className="stat-trend">↑ 15% this month</p>
                </div>
                <div className="stat-card">
                  <h4>Total Donors</h4>
                  <p className="stat-value">342</p>
                  <p className="stat-trend">↑ 12 new this week</p>
                </div>
                <div className="stat-card">
                  <h4>Active Campaigns</h4>
                  <p className="stat-value">5</p>
                  <p className="stat-trend">2 ending soon</p>
                </div>
                <div className="stat-card">
                  <h4>Communities Served</h4>
                  <p className="stat-value">52</p>
                  <p className="stat-trend">Across East Africa</p>
                </div>
              </div>

              <div className="admin-notice">
                <p>
                  <strong>⚠️ Note:</strong> This is a placeholder admin dashboard. 
                  For production, implement proper authentication, database integration, 
                  and comprehensive analytics.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="tab-panel">
              <h3>Recent Donations</h3>
              <table className="donations-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nov 18, 2025</td>
                    <td>John Doe</td>
                    <td>$100</td>
                    <td>Stripe</td>
                    <td><span className="badge success">Completed</span></td>
                  </tr>
                  <tr>
                    <td>Nov 17, 2025</td>
                    <td>Jane Smith</td>
                    <td>$250</td>
                    <td>PayPal</td>
                    <td><span className="badge success">Completed</span></td>
                  </tr>
                  <tr>
                    <td>Nov 16, 2025</td>
                    <td>Robert Johnson</td>
                    <td>$500</td>
                    <td>Stripe</td>
                    <td><span className="badge success">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="tab-panel">
              <h3>Donor Management</h3>
              <p>Manage donor information, newsletters, and communication preferences.</p>
              <p style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <strong>Implementation needed:</strong> Add donor database, segmentation, and communication tools.
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-panel">
              <h3>Admin Settings</h3>
              <div className="settings-group">
                <h4>Payment Settings</h4>
                <p>Manage Stripe and PayPal configurations</p>
                <button className="settings-btn">Configure Payments</button>
              </div>

              <div className="settings-group">
                <h4>Email Settings</h4>
                <p>Set up email templates and notifications</p>
                <button className="settings-btn">Configure Email</button>
              </div>

              <div className="settings-group">
                <h4>Security</h4>
                <p>Manage authentication and access control</p>
                <button className="settings-btn">Security Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>


    </section>
  );
}

export default Admin;
