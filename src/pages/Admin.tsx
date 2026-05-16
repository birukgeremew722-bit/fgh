import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../context/FirebaseContext';
import { 
  Users, 
  Calendar, 
  Package, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  LayoutDashboard,
  Settings,
  LogOut
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 18 },
  { name: 'Wed', revenue: 2000, bookings: 29 },
  { name: 'Thu', revenue: 2780, bookings: 23 },
  { name: 'Fri', revenue: 1890, bookings: 38 },
  { name: 'Sat', revenue: 2390, bookings: 42 },
  { name: 'Sun', revenue: 3490, bookings: 31 },
];

export default function Admin() {
  const { reservations, orders, updateReservationStatus, updateOrderStatus, isAdmin, login, logout } = useFirebase();
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center p-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-16 max-w-lg"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 text-gold">
            <LayoutDashboard size={32} />
          </div>
          <h2 className="text-3xl font-serif text-white mb-4 italic">The Master’s Sanctum.</h2>
          <p className="text-stone-500 mb-10 text-sm font-light leading-relaxed">This terminal is reserved for L'Aurum elite leadership. Authentic credentials are required to oversee the pulse of the atelier.</p>
          <button onClick={login} className="gold-button px-16 py-5 mx-auto">Digitally Authenticate</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col p-8 pt-32 fixed h-full">
        <div className="mb-12">
          <h2 className="text-lg font-serif italic text-white flex items-center gap-3">
             <div className="w-2 h-2 bg-gold rounded-full" />
             L'Aurum Console
          </h2>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Performance' },
            { id: 'reservations', icon: Calendar, label: 'Bookings' },
            { id: 'orders', icon: Package, label: 'Kitchen Orders' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === item.id ? "bg-white/5 text-gold border border-gold/20" : "text-stone-500 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <button className="w-full flex items-center gap-4 px-6 py-3 text-stone-600 hover:text-stone-400 text-xs font-bold uppercase tracking-widest transition-all">
            <Settings size={16} />
            Site Config
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-3 text-red-900/50 hover:text-red-600 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pl-72">
        <div className="p-12 pt-32 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif text-white mb-2">
                Operational <span className="italic font-light text-gold text-5xl">Pulse</span>
              </h1>
              <p className="text-stone-500 text-sm">{format(new Date(), 'EEEE, MMMM do yyyy')}</p>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={16} />
                <input 
                  type="text" 
                  placeholder="Global Search..." 
                  className="bg-white/5 border border-white/5 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-gold/30 transition-all w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Revenue', value: '$12,450', trend: '+12%', icon: TrendingUp },
                    { label: 'Reservations', value: '342', trend: '+5%', icon: Calendar },
                    { label: 'Gourmet Orders', value: '891', trend: '+18%', icon: Package },
                    { label: 'Active Guests', value: '42', trend: 'Live', icon: Users },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-card p-8 border border-white/5 hover:border-gold/30 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                           <stat.icon size={20} />
                         </div>
                         <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">{stat.trend}</span>
                      </div>
                      <p className="text-stone-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{stat.label}</p>
                      <h4 className="text-3xl font-serif text-white">{stat.value}</h4>
                    </div>
                  ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 glass-card p-8 min-h-[400px]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8">Revenue Analytics</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10}} />
                          <Tooltip 
                            contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px'}}
                            itemStyle={{color: '#d4af37'}}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#d4af37" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="lg:col-span-4 glass-card p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8">Recent Activity</h3>
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-stone-500 font-bold">{i}</div>
                          <div className="space-y-1">
                            <p className="text-sm text-white font-medium">New Reservation</p>
                            <p className="text-[10px] text-stone-500 uppercase tracking-wider">Table for 4 • Today 20:00</p>
                          </div>
                          <p className="text-[9px] text-stone-700 ml-auto whitespace-nowrap">2m ago</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reservations' && (
              <motion.div
                key="reservations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="glass-card overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Guest</th>
                          <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Date/Time</th>
                          <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">People</th>
                          <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Status</th>
                          <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((res) => (
                          <tr key={res.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
                            <td className="px-8 py-6">
                               <p className="text-white font-medium">{res.fullName}</p>
                               <p className="text-[10px] text-stone-500">{res.email}</p>
                            </td>
                            <td className="px-8 py-6 text-sm text-stone-300">
                               {res.date} at {res.time}
                            </td>
                            <td className="px-8 py-6 text-sm text-stone-300 text-center">
                               {res.guests}
                            </td>
                            <td className="px-8 py-6">
                               <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                 res.status === 'confirmed' ? "bg-green-500/10 text-green-500" : 
                                 res.status === 'cancelled' ? "bg-red-500/10 text-red-500" :
                                 "bg-gold/10 text-gold"
                               }`}>
                                 {res.status}
                               </span>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex gap-2">
                                  <button onClick={() => updateReservationStatus(res.id!, 'confirmed')} className="p-2 bg-white/5 rounded-lg text-stone-500 hover:text-green-500 transition-all"><CheckCircle2 size={16}/></button>
                                  <button onClick={() => updateReservationStatus(res.id!, 'cancelled')} className="p-2 bg-white/5 rounded-lg text-stone-500 hover:text-red-500 transition-all"><XCircle size={16}/></button>
                               </div>
                            </td>
                          </tr>
                        ))}
                        {reservations.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-8 py-20 text-center text-stone-600 italic">No reservation requests in the queue.</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
               <motion.div
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {orders.map((order) => (
                  <div key={order.id} className="glass-card p-8 border border-white/5 group hover:border-gold/30 transition-all">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Order #{order.id?.slice(-4)}</p>
                           <h4 className="text-white font-medium">{order.customerName}</h4>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          order.status === 'delivered' ? "bg-green-500/10 text-green-500" : "bg-gold/10 text-gold"
                        }`}>
                          {order.status}
                        </span>
                     </div>

                     <div className="space-y-4 mb-8">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                             <span className="text-stone-400">{item.quantity}x {item.name}</span>
                             <span className="text-stone-600">${item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="pt-4 border-t border-white/5 flex justify-between font-bold text-white text-sm">
                           <span>Total Harvest</span>
                           <span className="text-gold">${order.total}</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <select 
                          className="bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold uppercase px-3 py-2 text-stone-400 focus:outline-none"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id!, e.target.value as any)}
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-600 group-hover:text-gold transition-all">
                           Details <MoreHorizontal size={14}/>
                        </button>
                     </div>
                  </div>
                ))}
                {orders.length === 0 && (
                   <div className="col-span-full py-32 text-center text-stone-600 italic glass-card">No culinary orders active.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
