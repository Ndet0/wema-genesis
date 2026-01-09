// src/components/features/Donation/DonationForm.jsx
import { useState } from "react";
import { useDonation } from "../../../context/DonationContext.jsx";
import Button from "../../common/Button";

const DonationForm = () => {
  const { donate, loading, error } = useDonation();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) return;

    donate({
      amount: Number(amount),
      name: name || "Anonymous",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Redirecting…" : "Donate"}
      </Button>
    </form>
  );
};

export default DonationForm;
