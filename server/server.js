// server.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());

// allow requests from your Vite dev server (adjust if you host elsewhere)
const FRONTEND_ORIGIN = process.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: [FRONTEND_ORIGIN, "http://localhost:5173"],
  })
);

// Rate limiter to protect public endpoints (tunable)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Validate environment
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY in environment. Exiting.");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session for Stripe Checkout
// Apply rate limiter to the checkout session endpoint
app.use("/create-checkout-session", apiLimiter);

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Charity Donation",
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173"}/success`,
      cancel_url: `${process.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173"}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
