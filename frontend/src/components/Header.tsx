import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isFiz = location.pathname.startsWith('/fiz');
  const isJur = location.pathname.startsWith('/jur');
  
  const handleSwitch = (type: 'fiz' | 'jur') => {
    navigate(`/${type}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Switcher */}
          <div className="flex items-center rounded-full bg-zinc-900 p-1 border border-zinc-800">
            <button
              onClick={() => handleSwitch('fiz')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isFiz ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Частным лицам
            </button>
            <button
              onClick={() => handleSwitch('jur')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isJur ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Для бизнеса
            </button>
          </div>

          <div className="h-6 w-px bg-zinc-800" />

          <Link to={isJur ? "/jur/services" : "/fiz/services"} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Услуги
          </Link>
          <Link to="/about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            О студии
          </Link>
          <Link to="/contact" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Контакты
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-zinc-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 p-4 space-y-4">
           <div className="flex flex-col gap-2 p-2 bg-zinc-900 rounded-xl">
            <button
              onClick={() => handleSwitch('fiz')}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all text-left ${
                isFiz ? 'bg-zinc-800 text-white' : 'text-zinc-400'
              }`}
            >
              Частным лицам
            </button>
            <button
              onClick={() => handleSwitch('jur')}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all text-left ${
                isJur ? 'bg-zinc-800 text-white' : 'text-zinc-400'
              }`}
            >
              Для бизнеса
            </button>
          </div>
          <nav className="flex flex-col gap-4 px-2">
            <Link to={isJur ? "/jur/services" : "/fiz/services"} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-zinc-300">
              Услуги
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-zinc-300">
              О студии
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-zinc-300">
              Контакты
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
