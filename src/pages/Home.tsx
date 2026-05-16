import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Star, Clock, Utensils, GlassWater, ChefHat, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const featuredDishes = MENU_ITEMS.filter(item => item.popular).slice(0, 3);

  return (
    <div className="relative">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" 
            className="w-full h-full object-cover scale-110 brightness-[0.3]"
            alt="Aladdin Restaurant Addis Ababa"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a] z-[1]" />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.6em] text-gold uppercase mb-8 block">
              Lebanese & International Cuisine • Addis Ababa
            </span>
            <h1 className="text-7xl md:text-[12rem] font-serif leading-[0.8] text-white tracking-tighter mb-12 select-none">
              ALADDIN <br/> 
              <span className="italic font-light text-gold/80 block mt-4 text-[0.6em]">Restaurant</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          >
            <Link to="/reservations" className="gold-button px-14 py-5 text-sm">
              Reserve a Table
            </Link>
            <Link to="/restaurant" className="text-white font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 hover:text-gold transition-colors group">
              Explore the Menu <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true }}
             >
               <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block">Our Ethos</span>
               <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-10 italic">
                 Tradition meets <br/> <span className="text-gold font-light not-italic">the Avat-Garde.</span>
               </h2>
               <p className="text-xl text-stone-400 font-light leading-relaxed mb-12">
                 At Aladdin, we believe dining is more than sustenance—it's a journey through the flavors of the Orient and the passion of hospitality. Every plate is a story, every spice a memory.
               </p>
               <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-white font-serif text-2xl mb-2 italic">Provenance</h4>
                    <p className="text-sm text-stone-500">Sourced exclusively from heritage estates and artisanal foragers.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-2xl mb-2 italic">Craft</h4>
                    <p className="text-sm text-stone-500">Mastered over decades of culinary experimentation in silence.</p>
                  </div>
               </div>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5"
             >
                <img 
                  src="https://images.unsplash.com/photo-1550966842-28c460301392?w=800&q=80" 
                  className="w-full h-full object-cover"
                  alt="Chef at Work"
                />
                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section className="py-40 bg-stone-950 px-10">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-24">
            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block">Seasonal Highlights</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white italic">Featured Masterpieces</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredDishes.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-8 border border-white/5 shadow-2xl">
                   <img 
                      src={item.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name}
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Link to="/restaurant" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-gold transition-colors">
                        <ArrowRight size={20} />
                      </Link>
                   </div>
                </div>
                <div className="text-center">
                   <h4 className="text-2xl font-serif italic text-white mb-2 group-hover:text-gold transition-colors">{item.name}</h4>
                   <p className="text-[10px] font-bold tracking-[0.2em] text-stone-600 uppercase mb-4">{item.category}</p>
                   <p className="text-sm text-stone-500 font-light max-w-[250px] mx-auto italic">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-40 border-t border-white/5 px-10">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Exquisite Plates', value: '150k+', icon: Utensils },
              { label: 'Rare Vintages', value: '1,200', icon: GlassWater },
              { label: 'Master Chefs', value: '12', icon: ChefHat },
              { label: 'Michelin Stars', value: '3', icon: Star },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                 <stat.icon className="mx-auto text-gold/30 mb-6" size={32} strokeWidth={1} />
                 <h4 className="text-5xl font-serif text-white">{stat.value}</h4>
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">{stat.label}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Location / Map Section */}
      <section className="py-40 bg-stone-900 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block">Visit Us</span>
               <h2 className="text-5xl md:text-7xl font-serif text-white italic mb-8">In the Heart of <br/> <span className="text-gold not-italic">Addis Ababa</span></h2>
               <div className="space-y-6 text-stone-400">
                  <p className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Clock size={18} />
                    </span>
                    Open Daily: 12:00 PM - 11:30 PM
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                       <MapPin size={18} />
                    </span>
                    Bole Area, Addis Ababa, Ethiopia
                  </p>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="h-[500px] rounded-3xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
            >
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.59779374005!2d38.7758079871582!3d9.006616400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850ef3b433af%3A0xc47e3a968607174b!2sAladdin%20Restaurant!5e0!3m2!1sen!2set!4v1715843485012!5m2!1sen!2set" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-10">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-5xl mx-auto glass-card p-20 text-center relative overflow-hidden"
         >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <h3 className="text-5xl md:text-7xl font-serif text-white italic mb-12">Awaited by excellence.</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
               <Link to="/reservations" className="gold-button px-16 py-6">Secure Your Experience</Link>
               <Link to="/restaurant" className="text-stone-500 font-bold uppercase tracking-widest text-[11px] hover:text-white transition-colors">View Tonight's Menu</Link>
            </div>
         </motion.div>
      </section>
    </div>
  );
}
