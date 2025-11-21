import React, { useState } from 'react';
import './Admin.css';

const DASHBOARD_STATS = [
  { label: 'Total Donations', value: '$25,450', icon: '💰', trend: '+15% this month' },
  { label: 'Total Donors', value: '342', icon: '👥', trend: '+12 this week' },
  { label: 'Active Campaigns', value: '5', icon: '🎯', trend: '2 ending soon' },
  { label: 'Communities Served', value: '52', icon: '🌍', trend: 'Across East Africa' },
];

const RECENT_DONATIONS = [
  { date: 'Nov 20, 2025', donor: 'Jane Smith', amount: '$500', method: 'Card', status: 'Completed' },
  { date: 'Nov 19, 2025', donor: 'Ahmed Hassan', amount: '$250', method: 'PayPal', status: 'Completed' },
  { date: 'Nov 18, 2025', donor: 'Maria Garcia', amount: '$1,000', method: 'Card', status: 'Completed' },
  { date: 'Nov 17, 2025', donor: 'John Kipchoge', amount: '$100', method: 'Card', status: 'Completed' },
  { date: 'Nov 16, 2025', donor: 'Susan Lee', amount: '$750', method: 'PayPal', status: 'Completed' },
];

function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPasswordProtected] = useState(true);
  const [showWarning] = useState(true);

  return (
    <section id="admin" className="admin">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <p>Manage WEMA Charity Foundation operations and donations</p>
        </div>

        {/* Security Notice */}
        {showWarning && (
          <div className="admin-notice">
            <span className="notice-icon">🔒</span>
            <div className="notice-content">
              <strong>Production Note:</strong> This is a demo dashboard. Implement proper 
              authentication, role-based access control, and database integration before production.
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span>
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'donations' ? 'active' : ''}`}
            onClick={() => setActiveTab('donations')}
          >
            <span className="tab-icon">💳</span>
            Donations
          </button>
          <button
            className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
            onClick={() => setActiveTab('donors')}
          >
            <span className="tab-icon">👥</span>
            Donors
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <h3>Dashboard Overview</h3>
              
              {/* Stats Grid */}
              <div className="stats-grid">
                {DASHBOARD_STATS.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-header">
                      <span className="stat-icon">{stat.icon}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-trend">{stat.trend}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <div className="actions-grid">
                  <button className="action-btn">
                    <span className="action-icon">📧</span>
                    Send Donor Newsletter
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📋</span>
                    Generate Report
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📞</span>
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Donations Tab */}
          {activeTab === 'donations' && (
            <div className="tab-panel">
              <h3>Recent Donations</h3>
              <p className="tab-description">Latest donation transactions</p>
              
              <div className="table-wrapper">
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
                    {RECENT_DONATIONS.map((donation, index) => (
                      <tr key={index}>
                        <td>{donation.date}</td>
                        <td>{donation.donor}</td>
                        <td className="amount">{donation.amount}</td>
                        <td>{donation.method}</td>
                        <td>
                          <span className="badge badge-success">{donation.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <button className="btn btn-secondary">Export to CSV</button>
                <button className="btn btn-secondary">View All Transactions</button>
              </div>
            </div>
          )}

          {/* Donors Tab */}
          {activeTab === 'donors' && (
            <div className="tab-panel">
              <h3>Donor Management</h3>
              <p className="tab-description">Manage donor information and communications</p>
              
              <div className="donor-section">
                <div className="section-card">
                  <h4>📊 Donor Statistics</h4>
                  <div className="stats-list">
                    <div className="stat-row">
                      <span>Active Donors</span>
                      <strong>342</strong>
                    </div>
                    <div className="stat-row">
                      <span>New This Month</span>
                      <strong>28</strong>
                    </div>
                    <div className="stat-row">
                      <span>Average Donation</span>
                      <strong>$74.35</strong>
                    </div>
                    <div className="stat-row">
                      <span>Recurring Donors</span>
                      <strong>87</strong>
                    </div>
                  </div>
                </div>

                <div className="section-card">
                  <h4>📧 Communication</h4>
                  <p className="section-description">
                    Manage newsletters and donor communications
                  </p>
                  <div className="button-group">
                    <button className="btn btn-secondary">Send Newsletter</button>
                    <button className="btn btn-secondary">Manage Segments</button>
                    <button className="btn btn-secondary">View Templates</button>
                  </div>
                </div>
              </div>

              <div className="implementation-note">
                <p>
                  <strong>Implementation Needed:</strong> Add donor database, segmentation tools, 
                  and advanced communication features.
                </p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-panel">
              <h3>Admin Settings</h3>

              <div className="settings-grid">
                {/* Payment Settings */}
                <div className="settings-card">
                  <div className="card-header">
                    <h4>💳 Payment Settings</h4>
                    <span className="status-badge">Configured</span>
                  </div>
                  <p className="setting-description">
                    Configure Stripe and PayPal payment processing
                  </p>
                  <div className="setting-details">
                    <div className="detail-row">
                      <span>Stripe Account:</span>
                      <strong>Connected</strong>
                    </div>
                    <div className="detail-row">
                      <span>PayPal Account:</span>
                      <strong>Connected</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-block">Manage Payments</button>
                </div>

                {/* Email Settings */}
                <div className="settings-card">
                  <div className="card-header">
                    <h4>📧 Email Settings</h4>
                    <span className="status-badge">Configured</span>
                  </div>
                  <p className="setting-description">
                    Set up email templates and notifications
                  </p>
                  <div className="setting-details">
                    <div className="detail-row">
                      <span>Notification Email:</span>
                      <strong>admin@wemacharity.org</strong>
                    </div>
                    <div className="detail-row">
                      <span>Email Templates:</span>
                      <strong>5 Active</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-block">Configure Email</button>
                </div>

                {/* Security Settings */}
                <div className="settings-card">
                  <div className="card-header">
                    <h4>🔒 Security</h4>
                    <span className="status-badge">Active</span>
                  </div>
                  <p className="setting-description">
                    Manage authentication and access control
                  </p>
                  <div className="setting-details">
                    <div className="detail-row">
                      <span>Two-Factor Auth:</span>
                      <strong>Enabled</strong>
                    </div>
                    <div className="detail-row">
                      <span>Last Login:</span>
                      <strong>Today, 10:30 AM</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-block">Security Settings</button>
                </div>

                {/* Database Settings */}
                <div className="settings-card">
                  <div className="card-header">
                    <h4>🗄️ Database</h4>
                    <span className="status-badge">Connected</span>
                  </div>
                  <p className="setting-description">
                    Manage database connections and backups
                  </p>
                  <div className="setting-details">
                    <div className="detail-row">
                      <span>Status:</span>
                      <strong>Healthy</strong>
                    </div>
                    <div className="detail-row">
                      <span>Last Backup:</span>
                      <strong>Today, 02:00 AM</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-block">Database Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;