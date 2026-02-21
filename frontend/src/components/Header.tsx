import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="h-10 w-auto text-white transition-opacity group-hover:opacity-90" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {/* Switcher */}
          <div className="flex items-center rounded-full bg-zinc-900 p-1 border border-zinc-800">
            <button
              onClick={() => handleSwitch('fiz')}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                isFiz ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Частным лицам
            </button>
            <button
              onClick={() => handleSwitch('jur')}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                isJur ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Для бизнеса
            </button>
          </div>

          <div className="h-8 w-px bg-zinc-900" />

          <nav className="flex items-center gap-8">
            <Link to={isJur ? "/jur/services" : "/fiz/services"} className="text-xs font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">
              Услуги
            </Link>
            <Link to="/about" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">
              О студии
            </Link>
            <Link to="/contact" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">
              Контакты
            </Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-zinc-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-black p-4 space-y-4">
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
            <Link to={isJur ? "/jur/services" : "/fiz/services"} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
              Услуги
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
              О студии
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
              Контакты
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
