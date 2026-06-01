# Bistrot Georges Restaurant App

Production-grade Restaurant Online Ordering App featuring a React frontend, Node.js/Express backend, Stripe payments, Socket.io real-time tracking, and an Admin Dashboard.

## Features
- **Landing Page**: Modern branding and entry point.
- **Menu**: Browse and add authentic French dishes to your cart.
- **Checkout**: Secure payment processing with Stripe.
- **Order Tracking**: Real-time progress updates for customers.
- **Admin Dashboard**: Manage orders and update status in real-time.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Socket.io-client.
- **Backend**: Node.js, Express, Stripe API, Socket.io.

## Local Setup

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/itspecialist1111-jpg/bistrot-georges-restaurant-app.git
cd bistrot-georges-restaurant-app

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root:
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

Create a `client/.env` file:
```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Running the App
```bash
npm run dev
```
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Backend API**: http://localhost:3001

## Deployment to Vercel
1. Connect repo to Vercel.
2. Set Environment Variables in Vercel Dashboard.
3. Deploy! (The `vercel.json` handles the routing).
