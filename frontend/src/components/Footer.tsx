import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-400">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
            <span className="font-bold">Ai.Print</span>
          </h3>
          <p className="text-sm">
            Современная типография полного цикла. Печатаем быстро, качественно и с душой.
          </p>
          <div className="mt-4 text-sm text-zinc-500">
            <p>Perm, Pereselencheskaya St., 100</p>
            <p>Entrance 1, Office 1</p>
            <p>Intercom 100</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Услуги</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/fiz/services/photo-print" className="hover:text-white">Фотопечать</Link></li>
            <li><Link to="/fiz/services/documents" className="hover:text-white">Документы</Link></li>
            <li><Link to="/jur/services/polygraphy" className="hover:text-white">Полиграфия</Link></li>
            <li><Link to="/jur/services/large-format" className="hover:text-white">Широкоформатная печать</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Компания</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">О нас</Link></li>
            <li><Link to="/contact" className="hover:text-white">Контакты</Link></li>
            <li><Link to="/jur" className="hover:text-white">Для бизнеса</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+79958583035" className="hover:text-white">+7 (995) 858-30-35</a></li>
            <li><a href="mailto:zalogosfera@bk.ru" className="hover:text-white">zalogosfera@bk.ru</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
