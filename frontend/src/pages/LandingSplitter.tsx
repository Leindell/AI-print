import React from 'react';
import { Link } from 'react-router-dom';
import { User, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingSplitter: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row font-sans bg-black">
      {/* Fiz Section */}
      <Link
        to="/fiz"
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden border-b border-zinc-900 bg-zinc-950 p-8 text-center md:h-screen md:border-b-0 md:border-r"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          initial={false}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="mb-8 inline-flex rounded-2xl bg-zinc-900/80 p-8 shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:ring-indigo-500/50">
            <User className="h-16 w-16 text-white stroke-[1.5]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white tracking-tight">Частным клиентам</h2>
          <p className="max-w-xs text-zinc-400 text-lg leading-relaxed">
            Фотопечать, документы, сувениры и идеи для подарков
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-indigo-400 font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Перейти в каталог <span>→</span>
          </div>
        </motion.div>
      </Link>

      {/* Jur Section */}
      <Link
        to="/jur"
        className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black p-8 text-center md:h-screen"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          initial={false}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10"
        >
          <div className="mb-8 inline-flex rounded-2xl bg-zinc-900/80 p-8 shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:ring-emerald-500/50">
            <Building2 className="h-16 w-16 text-white stroke-[1.5]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white tracking-tight">Корпоративным клиентам</h2>
          <p className="max-w-xs text-zinc-400 text-lg leading-relaxed">
            Полиграфия, широкоформатная печать, брендирование и B2B услуги
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-emerald-400 font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Перейти в раздел <span>→</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
