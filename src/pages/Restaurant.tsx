import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Plus, ShoppingBag, Star, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartCount } = useCart();

  const categories = ['All', 'Starters', 'Main Courses', 'Cocktails', 'Desserts'];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block">The Gastronomy</span>
            <h1 className="text-6xl md:text-9xl font-serif tracking-tighter text-white leading-[0.85] mb-8">
              Culinary <br/> <span className="italic font-light text-gold text-[0.8em]">Artistry.</span>
            </h1>
            <p className="max-w-md text-stone-400 font-light leading-relaxed italic border-l border-gold/30 pl-8">
              A curated journey through heritage ingredients and avant-garde techniques. Selected with intent, prepared with soul.
            </p>
          </motion.div>
        </header>

        {/* Menu Controls */}
        <section className="sticky top-24 z-30 py-8 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/5 transition-all mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap px-4 py-2 rounded-full border",
                  activeCategory === cat
                    ? "text-gold border-gold/40 bg-gold/5"
                    : "text-stone-500 border-transparent hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={14} />
                <input 
                  type="text" 
                  placeholder="Find a masterpiece..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/5 rounded-full pl-12 pr-6 py-3 text-[11px] text-white focus:outline-none focus:border-gold/30 transition-all w-full md:w-64 tracking-widest uppercase"
                />
             </div>
             <Link to="/cart" className="relative p-3 bg-gold/10 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[9px] font-bold flex items-center justify-center rounded-full animate-pulse border border-black">
                    {cartCount}
                  </span>
                )}
             </Link>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl bg-stone-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                       <button
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                          className="w-full gold-button py-5 text-xs flex items-center justify-center gap-3"
                       >
                         Add to Selection <Plus size={14} />
                       </button>
                    </div>

                    {item.popular && (
                      <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-2 border border-gold/20">
                        <Star size={10} className="fill-gold" />
                        Signature Choice
                      </div>
                    )}
                  </div>

                  <div className="px-4 text-center">
                     <div className="flex flex-col items-center gap-2 mb-4">
                        <span className="text-[9px] font-bold text-stone-600 uppercase tracking-[0.3em]">{item.category}</span>
                        <h3 className="text-3xl font-serif text-white italic group-hover:text-gold transition-colors duration-500">{item.name}</h3>
                     </div>
                     <p className="text-sm text-stone-500 font-light leading-relaxed mb-6 italic line-clamp-2 max-w-[280px] mx-auto">{item.description}</p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 bg-gold/30" />
                        <span className="text-2xl font-serif text-gold font-light tracking-tighter">${item.price}</span>
                        <div className="h-[1px] w-8 bg-gold/30" />
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredItems.length === 0 && (
             <div className="py-40 text-center">
                <h3 className="text-2xl font-serif italic text-stone-600 mb-4">No matching masterpieces found.</h3>
                <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="text-gold text-[10px] font-bold uppercase tracking-widest border-b border-gold/30 pb-1">Reset Filters</button>
             </div>
          )}
        </section>
      </div>
    </div>
  );
}

