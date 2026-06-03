import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, Package } from 'lucide-react';

const TrackOrderSearch = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center">
        <div className="bg-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Track Your Order</h2>
        <p className="text-gray-500 mb-8">Enter your order ID to see real-time updates on your delicious meal.</p>

        <form onSubmit={handleTrack} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="e.g. ORDER-123"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-2xl outline-none transition-all font-bold"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            Track Now <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link to="/" className="text-gray-400 hover:text-primary font-bold transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderSearch;
