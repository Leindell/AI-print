import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Use Moscow time as requested
      const permTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Yekaterinburg" }));
      const day = permTime.getDay(); // 0 = Sunday
      const hours = permTime.getHours();
      const minutes = permTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      // Schedule:
      // Mon-Wed, Fri-Sun: 13:00 - 22:00
      // Thu: 18:30 - 22:00
      let open = 13 * 60;
      let close = 22 * 60;

      if (day === 4) { // Thursday
        open = 18 * 60 + 30;
      }

      setIsOpen(timeInMinutes >= open && timeInMinutes < close);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-zinc-900 bg-black py-16 text-zinc-500">
      <div className="container mx-auto grid gap-12 px-4 md:grid-cols-4">
        <div>
          <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Ai.Print</h3>
          <p className="mb-6 text-xs leading-relaxed">
            Современная типография полного цикла. Печатаем быстро, качественно и с душой.
          </p>
          <address className="not-italic text-xs leading-relaxed">
            Perm, Pereselencheskaya St., 100<br />
            Entrance 1, Office 1<br />
            Intercom 100
          </address>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium">
            <span className={`relative flex h-2 w-2`}>
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className={isOpen ? 'text-green-500' : 'text-red-500'}>
              {isOpen ? 'Магазин сейчас открыт' : 'Магазин сейчас закрыт'}
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Услуги</h3>
          <ul className="space-y-3 text-xs">
            <li><Link to="/fiz/services/photos" className="hover:text-white transition-colors">Фотопечать</Link></li>
            <li><Link to="/fiz/services/documents" className="hover:text-white transition-colors">Документы</Link></li>
            <li><Link to="/jur/services/polygraphy" className="hover:text-white transition-colors">Полиграфия</Link></li>
            <li><Link to="/jur/services/wide-format" className="hover:text-white transition-colors">Широкоформатная печать</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Компания</h3>
          <ul className="space-y-3 text-xs">
            <li><Link to="/about" className="hover:text-white transition-colors">О нас</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
            <li><Link to="/jur" className="hover:text-white transition-colors">Для бизнеса</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Контакты</h3>
          <ul className="space-y-3 text-xs">
            <li><a href="tel:+79958583035" className="hover:text-white transition-colors">+7 (995) 858-30-35</a></li>
            <li><a href="mailto:zalogosfera@bk.ru" className="hover:text-white transition-colors">zalogosfera@bk.ru</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
