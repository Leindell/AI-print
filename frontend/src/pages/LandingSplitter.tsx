import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingSplitter: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-black">
      {/* Left Side: Fiz (Private Clients) */}
      <Link 
        to="/fiz" 
        className="group relative flex h-1/2 w-full flex-col items-center justify-center border-b border-zinc-900 md:h-full md:w-1/2 md:border-b-0 md:border-r overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center text-center p-8"
        >
          {/* Hover Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 transition-all duration-700 group-hover:from-indigo-900/10 group-hover:via-indigo-900/5 group-hover:to-transparent" />
          
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl shadow-indigo-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:border-indigo-500/30 group-hover:shadow-indigo-500/20">
            <User className="h-10 w-10 text-white transition-colors group-hover:text-indigo-400" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl transition-colors group-hover:text-indigo-100">Частным клиентам</h2>
          <p className="mb-8 max-w-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
            Фотопечать, документы, сувениры и идеи для подарков
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-400 transition-all group-hover:translate-x-2 group-hover:text-indigo-300">
            Перейти в каталог <ArrowRight className="h-4 w-4" />
          </div>
        </motion.div>
      </Link>

      {/* Right Side: Jur (Corporate Clients) */}
      <Link 
        to="/jur" 
        className="group relative flex h-1/2 w-full flex-col items-center justify-center bg-black md:h-full md:w-1/2 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="z-10 flex flex-col items-center text-center p-8"
        >
          {/* Hover Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 transition-all duration-700 group-hover:from-emerald-900/10 group-hover:via-emerald-900/5 group-hover:to-transparent" />

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl shadow-emerald-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/20">
            <Building2 className="h-10 w-10 text-white transition-colors group-hover:text-emerald-400" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl transition-colors group-hover:text-emerald-100">Корпоративным клиентам</h2>
          <p className="mb-8 max-w-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
            Полиграфия, широкоформатная печать, брендирование и B2B услуги
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 transition-all group-hover:translate-x-2 group-hover:text-emerald-300">
            Перейти в каталог <ArrowRight className="h-4 w-4" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
