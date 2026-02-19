import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingSplitter: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-zinc-950 text-white">
      {/* Left Side - Individuals */}
      <Link 
        to="/fiz" 
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden border-r border-zinc-900 bg-zinc-950 p-12 text-center transition-all hover:bg-zinc-900/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 shadow-xl ring-1 ring-zinc-800 transition-transform group-hover:scale-110 group-hover:ring-indigo-500/50">
            <User className="h-10 w-10 text-zinc-100" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Частным клиентам</h2>
            <p className="max-w-xs text-zinc-400">
              Фотопечать, документы, сувениры и идеи для подарков
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
            Перейти в каталог <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>

      {/* Right Side - Business */}
      <Link 
        to="/jur" 
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-950 p-12 text-center transition-all hover:bg-zinc-900/50"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 shadow-xl ring-1 ring-zinc-800 transition-transform group-hover:scale-110 group-hover:ring-emerald-500/50">
            <Building2 className="h-10 w-10 text-zinc-100" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Корпоративным клиентам</h2>
            <p className="max-w-xs text-zinc-400">
              Полиграфия, широкоформатная печать, брендирование и B2B услуги
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
            Перейти в раздел <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>
    </div>
  );
};
