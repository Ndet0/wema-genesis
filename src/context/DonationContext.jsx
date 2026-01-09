// src/context/DonationContext.js
import { createContext, useContext, useState } from "react";
import { createDonation } from "../services/api/donations";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const donate = async ({ amount, name }) => {
    try {
      setLoading(true);
      setError(null);

      const { checkoutUrl } = await createDonation({
        amount,
        name,
      });

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setError("Failed to start donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonationContext.Provider value={{ donate, loading, error }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);
