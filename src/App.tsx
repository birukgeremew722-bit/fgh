/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import { CartProvider } from './context/CartContext';
import { FirebaseProvider } from './context/FirebaseContext';

export default function App() {
  return (
    <FirebaseProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-aurum-bg text-aurum-text flex flex-col font-sans relative overflow-x-hidden">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
              <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4a3424] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#1a1410] rounded-full blur-[100px]"></div>
            </div>

            <Navbar />
            <main className="flex-grow z-10 relative">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </CartProvider>
    </FirebaseProvider>
  );
}

