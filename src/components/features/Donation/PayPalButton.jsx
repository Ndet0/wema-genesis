// src/PayPalButton.jsx
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount }) {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

  // if no client id or no amount entered, show a small note instead of an empty PayPal area
  if (!clientId) {
    return <div style={{ color: "crimson" }}>PayPal not configured</div>;
  }

  const amt = amount && Number(amount) > 0 ? Number(amount).toFixed(2) : null;

  return (
    <div style={{ maxWidth: 360 }}>
      {!amt ? (
        <div style={{ color: "#666", fontSize: 14 }}>Enter an amount to show PayPal</div>
      ) : (
        <PayPalScriptProvider options={{ "client-id": clientId, currency: "USD" }}>
          <PayPalButtons
            style={{ layout: "vertical", height: 35 }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Charity Donation",
                    amount: {
                      value: amt,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`Thank you, ${details.payer.name.given_name}! 💖`);
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout Error:", err);
              alert("Something went wrong with PayPal payment.");
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
}
