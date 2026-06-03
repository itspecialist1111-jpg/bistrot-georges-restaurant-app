import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import LandingPage from './pages/LandingPage'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Success from './pages/Success'
import OrderTracking from './pages/OrderTracking'
import TrackOrderSearch from './pages/TrackOrderSearch'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/track" element={<TrackOrderSearch />} />
          <Route path="/track/:orderId" element={<OrderTracking />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
