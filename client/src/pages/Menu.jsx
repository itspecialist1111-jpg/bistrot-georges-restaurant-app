import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading deliciousness...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white px-8 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary italic">Bistrot Georges</Link>
          <Link to="/cart" className="relative bg-primary text-white p-3 rounded-full hover:bg-black transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 mt-12">
        <h2 className="text-4xl font-bold text-primary mb-8">Our Menu</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-primary">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-accent uppercase tracking-widest mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-primary font-bold py-4 rounded-2xl hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
