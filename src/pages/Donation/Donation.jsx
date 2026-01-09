import React, { useState } from "react";
import { useDonation } from "../../context/DonationContext.jsx";
import PayPalButton from "../../components/features/Donation/PayPalButton";
import "./Donation.css";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

function Donation() {
  const { donate, loading, error } = useDonation();

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const donationAmount = parseFloat(amount) || 0;

  const handleDonate = () => {
    if (!amount || donationAmount <= 0) return;

    donate({
      amount: donationAmount,
      name: "Anonymous",
    });
  };

  return (
    <section id="donation" className="donation">
      <div className="donation-container">
        <div className="donation-header">
          <h2>Support Our Mission</h2>
          <p className="donation-subtitle">
            Your generous donation helps us transform lives and build stronger communities.
          </p>
        </div>

        <div className="donation-content">
          <div className="donation-form-wrapper">
            <div className="donation-method-selector">
              <button
                className={`method-btn ${paymentMethod === "stripe" ? "active" : ""}`}
                onClick={() => setPaymentMethod("stripe")}
              >
                💳 Card
              </button>
              <button
                className={`method-btn ${paymentMethod === "paypal" ? "active" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                🅿️ PayPal
              </button>
            </div>

            {error && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="amount-section">
              <label htmlFor="amount" className="amount-label">
                Donation Amount (USD)
              </label>

              <div className="amount-input-wrapper">
                <span className="currency">$</span>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="amount-input"
                />
              </div>

              <div className="preset-amounts">
                <p className="preset-label">Quick amounts:</p>
                <div className="preset-buttons">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      className={`preset-btn ${
                        amount === preset.toString() ? "active" : ""
                      }`}
                      onClick={() => setAmount(preset.toString())}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {paymentMethod === "stripe" ? (
              <button
                className="btn btn-donate"
                onClick={handleDonate}
                disabled={!amount || donationAmount <= 0 || loading}
              >
                {loading
                  ? "Redirecting…"
                  : `Donate $${donationAmount.toFixed(2)}`}
              </button>
            ) : (
              <div className="paypal-wrapper">
                <PayPalButton amount={amount} />
              </div>
            )}

            <div className="donation-security">
              <p>🔒 Your donation is secure and encrypted</p>
            </div>
          </div>

          <div className="donation-info">
            <h3>Why Your Donation Matters</h3>
            <div className="impact-list">
              <div className="impact-item">
                <span className="impact-icon">📚</span>
                <div>
                  <h4>Education</h4>
                  <p>Help provide quality education to underprivileged children</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🏥</span>
                <div>
                  <h4>Healthcare</h4>
                  <p>Support essential medical services in remote communities</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🍽️</span>
                <div>
                  <h4>Food Security</h4>
                  <p>Provide nutritious meals to families in need</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🏠</span>
                <div>
                  <h4>Shelter</h4>
                  <p>Build safe homes for vulnerable populations</p>
                </div>
              </div>
            </div>

            <div className="donation-faq">
              <h4>Frequently Asked</h4>
              <p>
                All donations are tax-deductible. You'll receive a receipt immediately after completing your donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Donation;
