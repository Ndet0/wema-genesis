# 🤝 WEMA Charity Foundation

A modern web platform for the WEMA Charity Foundation, built with React and Vite. This site enables donors to contribute to charitable causes through multiple payment methods (Stripe, PayPal) and provides information about the foundation's mission and impact.

## ✨ Features

- **🎯 Responsive Design** — Mobile-first, fully responsive layout
- **💳 Multiple Payment Methods** — Stripe Checkout and PayPal integration
- **📱 Mobile Navigation** — Hamburger menu for seamless mobile experience
- **🔐 Secure Payments** — PCI-compliant payment processing
- **📧 Contact Forms** — Reach out to the foundation easily
- **📊 Admin Dashboard** — Basic dashboard for managing donations and donors
- **⚡ Fast Performance** — Built with Vite for instant dev and build times
- **🎨 Modern UI** — Clean, professional design with smooth animations

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 7
- **Styling:** CSS (modular with component-scoped styles)
- **Backend:** Express.js (Node.js)
- **Payments:** 
  - Stripe (Card payments)
  - PayPal (PayPal wallet payments)
- **Tools:** ESLint, dotenv

## 📋 Project Structure

```
wema/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── About.jsx         # Foundation story and impact
│   │   ├── Admin.jsx         # Admin dashboard (placeholder)
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css           # App styles
│   │   ├── Contact.jsx       # Contact form
│   │   ├── Donation.jsx      # Donation form (Stripe + PayPal)
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Header.css        # Header styles
│   │   ├── Home.jsx          # Home/hero section
│   │   ├── Home.css          # Home styles
│   │   └── PayPalButton.jsx  # PayPal button component
│   ├── index.css             # Global styles
│   ├── main.jsx              # React entry point
├── .env                       # Environment variables (DO NOT COMMIT)
├── .env.example              # Example env variables
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies
├── package-lock.json         # Dependency lock file
├── server.js                 # Express backend for payments
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- A Stripe account (https://stripe.com)
- A PayPal account (https://developer.paypal.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Wema
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (copy from `.env.example` if provided):
   
   ```env
   # Stripe API Keys (from https://dashboard.stripe.com/apikeys)
   STRIPE_SECRET_KEY=sk_test_...
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   
   # PayPal API Keys (from https://developer.paypal.com/dashboard)
   VITE_PAYPAL_CLIENT_ID=AU49Ygk...
   
   # Server Configuration
   PORT=5000
   VITE_FRONTEND_ORIGIN=http://localhost:5173
   ```

   ⚠️ **IMPORTANT:** Never commit `.env` to git! Keep sensitive keys private.

4. **Start the development server**
   
   Open two terminals:
   
   **Terminal 1 - Frontend (Vite):**
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173
   
   **Terminal 2 - Backend (Express):**
   ```bash
   node server.js
   ```
   Backend runs on http://localhost:5000

5. **Open in browser**
   
   Navigate to http://localhost:5173

## 📖 Usage

### Making a Donation

1. Navigate to the Donation section
2. Enter donation amount
3. Choose payment method:
   - **Stripe:** Click "Donate with Stripe" (Card payment)
   - **PayPal:** Click "Donate with PayPal" (PayPal account)
4. Complete payment in the modal/popup
5. Success page confirmation

### Contact Form

- Fill out the contact form in the Contact section
- Fields: Name, Email, Phone, Subject, Message
- Currently logs to console (backend integration needed for production)

### Admin Dashboard

- Placeholder admin dashboard with tabs for:
  - Overview: Key metrics and stats
  - Donations: Recent donation history
  - Donors: Donor management (placeholder)
  - Settings: Payment and admin settings (placeholder)

## 🔧 Available Scripts

```bash
# Development - runs frontend (Vite) and backend (Express) separately
npm run dev              # Frontend: http://localhost:5173

# Production build
npm run build            # Creates optimized dist/ folder

# Preview production build locally
npm run preview

# Linting
npm run lint             # Check for code quality issues
npm run lint --fix       # Auto-fix fixable issues

# Backend
node server.js           # Runs Express server on port 5000
```

## 💳 Payment Integration

### Stripe Setup

1. Sign up at https://stripe.com
2. Get API keys from https://dashboard.stripe.com/apikeys
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   ```
4. Test with Stripe test card: `4242 4242 4242 4242`

### PayPal Setup

1. Sign up at https://developer.paypal.com
2. Create an app for credentials
3. Add to `.env`:
   ```
   VITE_PAYPAL_CLIENT_ID=AU49Ygk...
   ```
4. Switch to sandbox mode for testing

## 🐛 Troubleshooting

### Payment buttons not appearing
- Check browser console for errors
- Verify API keys in `.env`
- Ensure backend (`server.js`) is running
- Check CORS configuration in `server.js`

### Contact form not submitting
- Currently logs to console only (not connected to backend)
- To save submissions, add email service or database

### Build errors
- Clear `node_modules/` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure Node.js version 16+: `node --version`

### Port already in use
- Frontend (5173): `npm run dev -- --port 3000`
- Backend (5000): `PORT=3001 node server.js`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret API key (backend only) | `sk_test_...` |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public API key (frontend) | `pk_test_...` |
| `VITE_PAYPAL_CLIENT_ID` | PayPal client ID (frontend) | `AU49Ygk...` |
| `PORT` | Backend server port | `5000` |
| `VITE_FRONTEND_ORIGIN` | Frontend URL for CORS | `http://localhost:5173` |

## 🚀 Deployment

### Frontend (Vite)
```bash
npm run build
# Deploy the `dist/` folder to:
# - Vercel, Netlify, GitHub Pages, AWS S3, etc.
```

### Backend (Express)
```bash
# Deploy to: Heroku, Railway, AWS EC2, DigitalOcean, etc.
# Don't forget to set environment variables on the hosting platform
```

### Recommended Deployment Stack
- **Frontend:** Vercel, Netlify (free tier available)
- **Backend:** Railway, Render, Heroku (free tier available)
- **Database:** MongoDB Atlas, PostgreSQL (for production)

## 🔐 Security Checklist

- [ ] `.env` is in `.gitignore` (never commit API keys)
- [ ] Create `.env.example` with placeholder values
- [ ] Use environment variables for all sensitive data
- [ ] Enable CORS only for trusted domains in production
- [ ] Validate all form inputs on frontend and backend
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Consider adding rate limiting to payment endpoints
- [ ] Implement proper error logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:

- **Email:** info@wemacharity.org
- **Phone:** +1 (234) 567-890
- **GitHub Issues:** [Create an issue](../../issues)

---

**Made with ❤️ by WEMA Charity Foundation**

*Changing lives, one doorstep at a time.*
