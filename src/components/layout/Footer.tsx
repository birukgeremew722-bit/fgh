import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-12 bg-black flex items-center justify-between px-10 text-[10px] uppercase tracking-widest opacity-40 border-t border-white/5 z-50">
      <div className="flex gap-8">
        <span>Local Time: {time}</span>
        <span>Weather: 18°C Clear</span>
      </div>
      <div className="hidden md:flex gap-8">
        <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-all">Internal Access</a>
        <span>Aladdin Restaurant © 2026</span>
      </div>
    </footer>
  );
}
