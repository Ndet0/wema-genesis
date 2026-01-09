import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * GET /api/admin/donations
 * List recent Stripe donations
 */
router.get("/donations", async (req, res) => {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 50,
    });

    const donations = payments.data.map((p) => ({
      id: p.id,
      amount: p.amount_received / 100,
      currency: p.currency.toUpperCase(),
      status: p.status,
      createdAt: new Date(p.created * 1000),
    }));

    res.json(donations);
  } catch (error) {
    console.error("Admin donations error:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

/**
 * GET /api/admin/stats
 */
router.get("/stats", async (req, res) => {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 100 });

    const successful = payments.data.filter(p => p.status === "succeeded");

    const totalAmount = successful.reduce(
      (sum, p) => sum + p.amount_received,
      0
    );

    res.json({
      totalDonations: successful.length,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
