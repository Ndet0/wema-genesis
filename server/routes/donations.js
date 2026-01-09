// server/routes/donations.js
import express from "express";
import {
  createDonation,
  listDonations
} from "../controllers/donationController.js";

const router = express.Router();

router.get("/", listDonations);
router.post("/", createDonation);

export default router;
