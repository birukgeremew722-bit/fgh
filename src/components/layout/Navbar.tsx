import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, Utensils, Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Cuisine', path: '/restaurant' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 h-24 flex items-center',
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-8 group">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif tracking-widest text-gold uppercase transition-all group-hover:tracking-[0.6em]">Aladdin</span>
          </Link>
          
          {/* Desktop Links - Left aligned with Brand */}
          <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase text-stone-400">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-white",
                  location.pathname === link.path && "text-gold border-b border-gold pb-1"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side icons/profile */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Provenance</p>
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-[0.2em]">Member’s Lounge</p>
          </div>
          
          <Link
            to="/cart"
            className="w-10 h-10 rounded-full border border-gold/30 bg-stone-800 flex items-center justify-center text-gold relative transition-all hover:bg-stone-700"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-stone-950 text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950 border-t border-white/5 absolute top-24 left-0 right-0 overflow-hidden shadow-2xl z-40"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-stone-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5">
                <Link
                  to="/cart"
                  className="flex items-center gap-4 text-gold font-bold uppercase tracking-widest text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={18} />
                  Selection ({cartCount})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
