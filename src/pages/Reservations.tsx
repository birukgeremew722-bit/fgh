import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../context/FirebaseContext';
import { Calendar as CalendarIcon, Users, Clock, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import confetti from 'canvas-confetti';

export default function Reservations() {
  const { createReservation } = useFirebase();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    time: '19:00',
    guests: 2,
    seating: 'indoor' as 'indoor' | 'outdoor',
    specialRequests: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setLoading(true);
    try {
      await createReservation({
        ...formData,
        date: format(date, 'yyyy-MM-dd'),
        status: 'pending'
      });
      setSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#aa8a2e']
      });
    } catch (error) {
      console.error(error);
      alert('Failed to book reservation.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-20 px-10 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center max-w-xl"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20">
            <CheckCircle2 className="text-gold" size={40} />
          </div>
          <h2 className="text-4xl font-serif text-white mb-6 italic">Awaited Excellence.</h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            Your table at Aladdin has been provisionally reserved. Our Maître d' will contact you shortly at <strong>{formData.email}</strong> to finalize the arrangement.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="gold-button px-12 py-4"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block">Reservation</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-white tracking-tighter mb-8">
              Secure <br/> <span className="italic font-light text-gold">Your Table.</span>
            </h1>
            <p className="text-xl text-stone-400 font-light leading-relaxed">
              Experience the convergence of atmosphere and gastronomy. Our intimate spaces are highly sought after; advance booking is recommended.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Step Guide */}
          <div className="lg:col-span-4 space-y-8">
             {[
               { id: 1, title: 'Schedule', desc: 'Select your preferred date & time' },
               { id: 2, title: 'Details', desc: 'Party size & seating preference' },
               { id: 3, title: 'Confirmation', desc: 'Finalize guest information' }
             ].map((s) => (
               <div key={s.id} className={cn(
                 "p-6 rounded-xl border transition-all duration-500",
                 step === s.id ? "bg-white/5 border-gold/30" : "bg-transparent border-white/5 opacity-40"
               )}>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Step 0{s.id}</p>
                 <h4 className="text-white font-serif italic text-lg mb-2">{s.title}</h4>
                 <p className="text-xs text-stone-500">{s.desc}</p>
               </div>
             ))}

             <div className="pt-8 space-y-6">
                <div className="flex items-center gap-4 text-xs text-stone-500 uppercase tracking-widest">
                  <Clock size={14} className="text-gold" />
                  <span>Avg. Stay: 2.5 Hours</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-stone-500 uppercase tracking-widest">
                  <MapPin size={14} className="text-gold" />
                  <span>Main Hall / Terrace</span>
                </div>
             </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8">
             <form onSubmit={handleSubmit} className="glass-card p-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1 custom-calendar">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-4 block">Select Date</label>
                          <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="bg-black/20 p-4 rounded-xl border border-white/5"
                            modifiersStyles={{
                              selected: { backgroundColor: '#d4af37', color: 'black' },
                              today: { color: '#d4af37' }
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-8">
                           <div>
                              <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-4 block">Select Time</label>
                              <div className="grid grid-cols-2 gap-4">
                                {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({...formData, time: t})}
                                    className={cn(
                                      "py-3 text-xs font-bold rounded-lg border transition-all",
                                      formData.time === t ? "bg-gold text-black border-gold" : "bg-transparent border-white/5 text-stone-400 hover:border-gold/30"
                                    )}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                           </div>
                           <button 
                             type="button" 
                             onClick={handleNext}
                             className="gold-button w-full py-5 flex items-center justify-center gap-2"
                           >
                             Continue to Details <ChevronRight size={16} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-4">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Number of Guests</label>
                            <div className="flex items-center gap-6">
                               <button 
                                 type="button" 
                                 onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                                 className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all"
                               >-</button>
                               <span className="text-3xl font-serif italic text-white w-10 text-center">{formData.guests}</span>
                               <button 
                                 type="button" 
                                 onClick={() => setFormData({...formData, guests: Math.min(20, formData.guests + 1)})}
                                 className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all"
                               >+</button>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Seating Preference</label>
                            <div className="flex gap-4">
                               {['indoor', 'outdoor'].map(s => (
                                 <button
                                   key={s}
                                   type="button"
                                   onClick={() => setFormData({...formData, seating: s as any})}
                                   className={cn(
                                     "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all",
                                     formData.seating === s ? "bg-gold text-black border-gold" : "bg-transparent border-white/5 text-stone-400"
                                   )}
                                 >
                                   {s} Atmosphere
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block">Special Requests (Optional)</label>
                         <textarea 
                           className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-gold transition-all h-32"
                           placeholder="Anniversaries, dietary requirements, or preferred booth..."
                           value={formData.specialRequests}
                           onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                         />
                      </div>

                      <div className="flex gap-6">
                         <button type="button" onClick={handlePrev} className="px-10 py-5 border border-white/10 rounded-lg text-stone-500 font-bold uppercase tracking-widest text-[11px] hover:text-white transition-all">Back</button>
                         <button type="button" onClick={handleNext} className="gold-button flex-grow py-5">Confirm Information</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="space-y-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Full Name</label>
                               <input 
                                 type="text" required
                                 className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-gold transition-all"
                                 value={formData.fullName}
                                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                 placeholder="Aladdin Guest"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Email Address</label>
                               <input 
                                 type="email" required
                                 className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-gold transition-all"
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 placeholder="guest@aurum.com"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Phone Number</label>
                               <input 
                                 type="tel" required
                                 className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-gold transition-all"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                 placeholder="+33 1 23 45 67 89"
                               />
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-gold/5 rounded-xl border border-gold/10">
                         <h5 className="text-[10px] uppercase font-bold tracking-widest text-gold mb-4">Summary of Request</h5>
                         <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <div>
                               <p className="text-[9px] uppercase text-stone-600 font-bold mb-1">Date & Time</p>
                               <p className="text-white text-sm font-serif italic">{date ? format(date, 'MMMM do, yyyy') : 'N/A'} at {formData.time}</p>
                            </div>
                            <div>
                               <p className="text-[9px] uppercase text-stone-600 font-bold mb-1">Configuration</p>
                               <p className="text-white text-sm font-serif italic">{formData.guests} Guests • {formData.seating}</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex gap-6">
                         <button type="button" onClick={handlePrev} className="px-10 py-5 border border-white/10 rounded-lg text-stone-500 font-bold uppercase tracking-widest text-[11px] hover:text-white transition-all">Review</button>
                         <button 
                           type="submit" 
                           disabled={loading}
                           className="gold-button flex-grow py-5 disabled:opacity-50"
                         >
                           {loading ? 'Processing...' : 'Provision Reservation'}
                         </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

