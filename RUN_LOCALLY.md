# Step-by-Step Local Setup Guide

Follow these instructions to get the **Bistrot Georges Restaurant App** running on your local computer.

## Prerequisites
- **Node.js**: Version 18 or higher is required. [Download here](https://nodejs.org/).
- **NPM**: Usually comes with Node.js.
- **Git**: To clone the repository.

---

## Step 1: Clone the Repository
Open your terminal (Command Prompt, PowerShell, or Terminal) and run:
```bash
git clone https://github.com/itspecialist1111-jpg/bistrot-georges-restaurant-app.git
cd bistrot-georges-restaurant-app
```

## Step 2: Install Dependencies
This project uses a monorepo structure. You can install all necessary packages for both the frontend and backend from the root directory:
```bash
npm install
```

## Step 3: Configure Environment Variables
The app needs Stripe keys and environment settings to work.

### 1. Root `.env` (for Backend)
Create a file named `.env` in the root folder and add:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
CLIENT_URL=http://localhost:3000
PORT=3001
```

### 2. Client `.env` (for Frontend)
Create a file named `.env` inside the `client/` folder and add:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

*Note: You can get these keys from your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) in Test Mode.*

## Step 4: Run the Application
Start both the frontend and backend simultaneously with one command:
```bash
npm run dev
```

---

## Accessing the Application
Once the command finishes, you can access the app at:

- **Customer Storefront**: [http://localhost:3000](http://localhost:3000)
  - Browse the menu and place test orders.
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - Manage incoming orders and update their status in real-time.
- **Backend API Server**: [http://localhost:3001](http://localhost:3001)

## Troubleshooting
- **Port Conflict**: If port 3000 or 3001 is already in use, you might see an error. Make sure to close other running dev servers.
- **Stripe Errors**: Ensure your Stripe keys are correctly copied into the `.env` files.
- **Modules Not Found**: If you see dependency errors, try running `npm install` again in the root directory.

## Need Help?
If you encounter any issues, feel free to open a ticket or reach out to the development team.
