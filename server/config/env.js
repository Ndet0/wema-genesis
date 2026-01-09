import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  FRONTEND_ORIGIN: process.env.VITE_FRONTEND_ORIGIN || 'http://localhost:5173',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
