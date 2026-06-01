const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

app.use(cors());
app.use(express.json());

const { menuItems, orders } = require('./data');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'live', restaurant: 'Bistrot Georges' });
});

// Menu route
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Orders route
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `ORD-${Date.now()}`,
    items: req.body.items,
    total: req.body.total,
    status: 'Pending',
    createdAt: new Date(),
  };
  orders.push(newOrder);
  io.emit('new-order', newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(item => {
    const menuItem = menuItems.find(m => m.id === item.id);
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: Math.round(menuItem.price * 100),
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('update-order-status', ({ orderId, status }) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      io.emit('order-status-changed', { orderId, status });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
