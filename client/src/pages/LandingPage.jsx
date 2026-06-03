import React from 'react';
import { ShoppingBag, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary italic">Bistrot Georges</h1>
        <div className="flex gap-6 items-center">
          <Link to="/menu" className="text-gray-600 hover:text-accent font-medium">Menu</Link>
          <Link to="/track" className="text-gray-600 hover:text-accent font-medium">Track Order</Link>
          <Link to="/admin" className="text-gray-600 hover:text-accent font-medium">Admin</Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-primary leading-tight">
            Authentic <span className="text-accent italic">French</span> Cuisine at Your Door.
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-lg">
            Experience the finest flavors of Paris without leaving your home. From Steak Frites to Escargots, delivered fresh to you.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/menu" className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition-colors">
              Order Now
            </Link>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors">
              Our Story
            </button>
          </div>
          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-bold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-bold">25-35 Min Delivery</span>
            </div>
          </div>
        </div>
        <div className="relative h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1550966842-28c4074d6cce?auto=format&fit=crop&q=80&w=1000"
            alt="Delicious French Dish"
            className="rounded-3xl object-cover h-full w-full shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
            <p className="text-sm font-bold text-gray-500">Popular Dish</p>
            <p className="text-lg font-bold text-primary">Classic Steak Frites</p>
            <p className="text-accent font-bold mt-1">$24.50</p>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="bg-gray-50 py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-gray-600">Your food is cooked fresh and delivered while it's still hot and delicious.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-4">Quality Ingredients</h3>
            <p className="text-gray-600">We source only the finest organic and local ingredients for every dish.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-4">Local Root</h3>
            <p className="text-gray-600">Serving the heart of the city since 1998 with pride and passion.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
