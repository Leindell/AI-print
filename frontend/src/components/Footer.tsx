import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-400">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
            AI.Print Studio
          </Link>
          <p className="text-sm leading-relaxed">
            Современная типография полного цикла.
            Печатаем быстро, качественно и с душой.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Услуги</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/fiz/services" className="hover:text-white transition-colors">Фотопечать</Link></li>
            <li><Link to="/fiz/services" className="hover:text-white transition-colors">Документы</Link></li>
            <li><Link to="/jur/services" className="hover:text-white transition-colors">Полиграфия</Link></li>
            <li><Link to="/jur/services" className="hover:text-white transition-colors">Широкоформатная печать</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Компания</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">О нас</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
            <li><Link to="/jur" className="hover:text-white transition-colors">Для бизнеса</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="mb-4 font-semibold text-white">Контакты</h3>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>г. Москва, ул. Примерная, 123</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 shrink-0" />
            <a href="tel:+79990000000" className="hover:text-white transition-colors">+7 (999) 000-00-00</a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 shrink-0" />
            <a href="mailto:info@aiprint.ru" className="hover:text-white transition-colors">info@aiprint.ru</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 border-t border-zinc-900 pt-8 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} AI.Print Studio. Все права защищены.
      </div>
    </footer>
  );
};
