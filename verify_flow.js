const axios = require('axios');
const { io } = require('socket.io-client');

const API_URL = 'http://localhost:3001';

async function testFlow() {
  console.log('--- Starting End-to-End Flow Test ---');

  // 1. Check Health
  try {
    const health = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health check:', health.data);
  } catch (e) {
    console.error('❌ Health check failed. Is the server running?');
    return;
  }

  // 2. Fetch Menu
  const menu = await axios.get(`${API_URL}/api/menu`);
  console.log(`✅ Menu fetched: ${menu.data.length} items`);

  // 3. Setup Socket for customer
  const socket = io(API_URL);

  return new Promise((resolve) => {
    socket.on('connect', async () => {
      console.log('✅ Socket connected');

      // 4. Place Order
      const orderData = {
        items: [{ id: 1, name: 'Classic Steak Frites', quantity: 1, price: 24.5 }],
        total: 24.5
      };

      const orderResponse = await axios.post(`${API_URL}/api/orders`, orderData);
      const orderId = orderResponse.data.id;
      console.log(`✅ Order placed: ${orderId}`);

      // 5. Listen for status change
      socket.on('order-status-changed', (data) => {
        if (data.orderId === orderId) {
          console.log(`✅ Status update received: ${data.status}`);
          if (data.status === 'Preparing') {
            console.log('--- Test Completed Successfully ---');
            socket.disconnect();
            resolve();
          }
        }
      });

      // 6. Simulate Admin Update
      console.log('--- Simulating Admin status update ---');
      socket.emit('update-order-status', { orderId, status: 'Preparing' });
    });
  });
}

testFlow().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
