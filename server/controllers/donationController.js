// server/controllers/donationController.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createDonation = async (req, res) => {
  try {
    const { amount, currency = "usd", name = "Anonymous" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Donation from ${name}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.VITE_FRONTEND_ORIGIN}/success`,
      cancel_url: `${process.env.VITE_FRONTEND_ORIGIN}/cancel`,
    });

    res.status(201).json({
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ error: "Failed to create donation" });
  }
};

export const listDonations = async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
      expand: ["data.payment_intent"],
    });

    const donations = sessions.data
      .filter(s => s.payment_status === "paid")
      .map(s => ({
        id: s.id,
        amount: s.amount_total / 100,
        currency: s.currency,
        donor: s.customer_details?.email || "Anonymous",
        createdAt: new Date(s.created * 1000),
      }));

    res.json(donations);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};
