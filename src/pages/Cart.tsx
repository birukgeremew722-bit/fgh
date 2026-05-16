import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Trash2, ChevronRight, Utensils, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFirebase } from '../context/FirebaseContext';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

export default function Cart() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const { createOrder } = useFirebase();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ name: '', email: '', tableNumber: '' });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || isProcessing) return;

    setIsProcessing(true);
    try {
      await createOrder({
        items: cart.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        total: total * 1.1,
        customerName: orderInfo.name,
        customerEmail: orderInfo.email,
        status: 'pending'
      });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#000000']
      });

      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Order failed to reach the kitchen. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="pt-40 px-10 min-h-screen text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-xl mx-auto glass-card p-20"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10 text-gold">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-5xl font-serif text-white mb-6 italic">Awaited in the Atelier.</h2>
          <p className="text-stone-400 mb-12 font-light leading-relaxed">
            Your selection has been transmitted to our master chefs. Please remain seated; your experience will commence shortly.
          </p>
          <Link to="/restaurant" className="gold-button px-14 py-5 inline-block">Order More</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <Link to="/" className="text-stone-500 hover:text-white transition-all uppercase text-[10px] tracking-widest font-bold">L'Aurum</Link>
          <ChevronRight size={10} className="text-stone-700" />
          <span className="text-gold font-serif italic text-xl">The Curated Selection</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Order Items */}
          <div className="lg:col-span-7 space-y-10">
            {cart.length === 0 ? (
              <div className="glass-card p-24 text-center">
                 <ShoppingBag size={40} className="mx-auto text-stone-800 mb-8" />
                 <h3 className="text-3xl font-serif text-white italic mb-4">The tray is empty.</h3>
                 <p className="text-stone-500 mb-10 text-sm font-light">Every grand meal begins with a single selection.</p>
                 <Link to="/restaurant" className="gold-outline px-10 py-4 inline-block">Explore the Menu</Link>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="glass-card p-8 flex items-center gap-8 group relative overflow-hidden"
                    >
                      <div className="w-20 h-20 bg-stone-900 rounded-2xl flex items-center justify-center text-gold/30 border border-white/5">
                        <Utensils size={24} strokeWidth={1} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-2xl font-serif text-white font-light group-hover:text-gold transition-colors">{item.name}</h4>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-2 font-bold">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-serif italic text-gold tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-stone-700 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="flex justify-between items-center px-4 pt-4">
                   <button onClick={clearCart} className="text-[10px] text-stone-600 uppercase tracking-widest font-bold hover:text-white transition-colors">Clear All</button>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-card p-10 sticky top-32"
            >
              <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-10 block">Finalize Experience</h3>
              
              <form onSubmit={handleCheckout} className="space-y-8">
                 <div className="space-y-6 mb-10">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-stone-600 mb-3 block">Guest Name</label>
                      <input 
                        required
                        type="text"
                        value={orderInfo.name}
                        onChange={e => setOrderInfo({...orderInfo, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all text-sm"
                        placeholder="Monsieur / Madame..."
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-stone-600 mb-3 block">Digital Correspondence</label>
                      <input 
                        required
                        type="email"
                        value={orderInfo.email}
                        onChange={e => setOrderInfo({...orderInfo, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all text-sm"
                        placeholder="your@excellence.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-stone-600 mb-3 block">Table Designation</label>
                      <input 
                        required
                        type="text"
                        value={orderInfo.tableNumber}
                        onChange={e => setOrderInfo({...orderInfo, tableNumber: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all text-sm"
                        placeholder="e.g. Terrace 04"
                      />
                    </div>
                 </div>

                 <div className="space-y-4 border-t border-white/5 pt-10 mb-10">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
                      <span>Selection Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
                      <span>Service Gratitude (10%)</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Grand Folio</span>
                      <span className="text-5xl font-serif text-gold italic tracking-tighter">${(total * 1.1).toFixed(2)}</span>
                    </div>
                 </div>

                 <button
                   disabled={cart.length === 0 || isProcessing}
                   className={cn(
                     "w-full gold-button py-6 flex items-center justify-center gap-4 group",
                     (cart.length === 0 || isProcessing) && "opacity-50 cursor-not-allowed"
                   )}
                 >
                   {isProcessing ? (
                     <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                   ) : (
                     <>
                        Transmit to Kitchen <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                     </>
                   )}
                 </button>
              </form>

              <p className="mt-8 text-[9px] text-center text-stone-700 uppercase tracking-widest italic font-bold">
                Orders are final once transmitted for preparation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
