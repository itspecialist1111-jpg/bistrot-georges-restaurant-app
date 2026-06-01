import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { cart, clearCart, total } = useCart();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      if (sessionId && cart.length > 0) {
        try {
          const response = await axios.post('/api/orders', {
            items: cart,
            total: total,
            stripeSessionId: sessionId
          });
          setOrderId(response.data.id);
          clearCart();
        } catch (error) {
          console.error('Error creating order:', error);
        }
      }
    };
    createOrder();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-primary mb-4">Merci Beaucoup!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Your order has been placed successfully and is being prepared with care.
        </p>

        {orderId && (
          <div className="bg-secondary p-6 rounded-2xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="text-sm text-gray-500 font-bold uppercase">Order ID</p>
                <p className="font-bold text-primary">{orderId}</p>
              </div>
            </div>
            <Link
              to={`/track/${orderId}`}
              className="text-accent font-bold flex items-center gap-1 hover:underline"
            >
              Track <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Link to="/" className="bg-primary text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors">
            Return Home
          </Link>
          <Link to="/menu" className="text-primary font-bold hover:text-accent transition-colors">
            Order Something Else
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
