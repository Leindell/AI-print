import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="mb-8 text-4xl font-bold">Контакты</h1>
        
        {/* Map Container */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
          <div className="relative h-[320px] w-full md:h-[480px]">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?text=Пермь,+Переселенческая+ул.,+100&z=16" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              className="absolute inset-0"
              title="Yandex Map"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900">
            <MapPin className="h-10 w-10 text-zinc-400" />
            <h3 className="text-xl font-semibold">Адрес</h3>
            <p className="text-zinc-400">
              г. Пермь, Переселенческая ул., 100<br/>
              подъезд 1, офис 1, домофон 100
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900">
            <Phone className="h-10 w-10 text-zinc-400" />
            <h3 className="text-xl font-semibold">Связь</h3>
            <div className="flex flex-col gap-2">
              <a href="tel:+79958583035" className="text-zinc-400 hover:text-white transition-colors">
                +7 (995) 858-30-35
              </a>
              <a href="https://t.me/aiprinthelper" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Send className="h-4 w-4" /> @aiprinthelper
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900">
            <Mail className="h-10 w-10 text-zinc-400" />
            <h3 className="text-xl font-semibold">Email</h3>
            <a href="mailto:zalogosfera@bk.ru" className="text-zinc-400 hover:text-white transition-colors">
              zalogosfera@bk.ru
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
