import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post('/api/create-checkout-session', {
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      });
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md">
          <div className="bg-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious French dishes to get started!</p>
          <Link to="/menu" className="inline-block bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors">
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white px-8 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary italic">Bistrot Georges</Link>
          <Link to="/menu" className="text-primary font-bold hover:text-accent">Back to Menu</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 mt-12">
        <h2 className="text-4xl font-bold text-primary mb-8">Your Basket</h2>

        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-md flex items-center gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                <p className="text-accent font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4 bg-secondary p-2 rounded-2xl">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl text-gray-600">Total Amount</span>
            <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white text-xl font-bold py-5 rounded-2xl hover:bg-black transition-colors"
          >
            Checkout
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Cart;
