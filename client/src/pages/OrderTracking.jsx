import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Clock, CheckCircle, Package, Truck, Utensils, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const socket = io();

const OrderTracking = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const statuses = [
    { label: 'Pending', icon: Clock },
    { label: 'Preparing', icon: Utensils },
    { label: 'Out for Delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle },
  ];

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setStatus(response.data.status);
      } catch (err) {
        console.error('Error fetching order status:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();

    socket.on('order-status-changed', (data) => {
      if (data.orderId === orderId) {
        setStatus(data.status);
      }
    });

    return () => {
      socket.off('order-status-changed');
    };
  }, [orderId]);

  const currentStatusIndex = statuses.findIndex(s => s.label === status);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-8">We couldn't find an order with that ID. Please check and try again.</p>
        <Link to="/track" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-black block">
          Try Another ID
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-primary italic">Bistrot Georges</h1>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-8 py-12">
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Order Tracking</p>
            <h2 className="text-3xl font-bold text-primary mb-2">#{orderId}</h2>
            <p className="text-gray-600">We'll update you as your food moves along.</p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-100 -z-0">
              <motion.div
                className="w-full bg-accent origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: currentStatusIndex / (statuses.length - 1) }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="space-y-12">
              {statuses.map((s, index) => {
                const Icon = s.icon;
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={s.label} className="flex items-center gap-8 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                      isCompleted ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>
                        {s.label}
                      </h3>
                      {isCurrent && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-accent text-sm font-bold mt-1"
                        >
                          Current Status
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 bg-secondary p-8 rounded-2xl flex items-center gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-bold text-primary">Estimated Delivery</p>
              <p className="text-gray-600 text-lg">25 - 35 Minutes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
