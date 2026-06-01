import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LayoutDashboard, Package, Clock, CheckCircle, Truck, Utensils } from 'lucide-react';

const socket = io();

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    socket.on('new-order', (order) => {
      setOrders(prev => [order, ...prev]);
    });

    return () => {
      socket.off('new-order');
    };
  }, []);

  const updateStatus = (orderId, newStatus) => {
    socket.emit('update-order-status', { orderId, status: newStatus });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-8 hidden lg:block">
        <div className="flex items-center gap-3 mb-12">
          <LayoutDashboard className="w-8 h-8 text-accent" />
          <h1 className="text-xl font-bold italic">Admin Panel</h1>
        </div>
        <nav className="space-y-4">
          <button className="flex items-center gap-3 w-full bg-accent p-4 rounded-xl font-bold">
            <Package className="w-5 h-5" />
            Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-auto">
        <header className="mb-12 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary">Order Management</h2>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm font-bold text-primary">
            Total Orders: {orders.length}
          </div>
        </header>

        <div className="grid gap-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold bg-secondary text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">
                    {order.id}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </h3>
                <p className="text-2xl font-bold text-accent">${order.total?.toFixed(2)}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[ 'Pending', 'Preparing', 'Out for Delivery', 'Delivered' ].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order.id, status)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      order.status === status
                        ? 'bg-primary text-white scale-105'
                        : 'bg-secondary text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl text-gray-400">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No orders yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
