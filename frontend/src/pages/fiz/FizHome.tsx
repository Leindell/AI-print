import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Send, Camera, Image as ImageIcon, Gift, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { services } from '../../data/services';
import { TG_MANAGER } from '../../config/links';

export const FizHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter services for 'fiz' category and take first 6
  const featuredServices = services.filter(s => s.category === 'fiz').slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-black px-4 text-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        
        <div className="z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            <span>Работаем ежедневно</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Ai.Print <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Studio</span>
          </h1>
          
          <p className="mb-10 text-lg text-zinc-400 md:text-xl max-w-2xl mx-auto">
            Ваш партнер по быстрой и качественной печати.
            <br />
            Полиграфия будущего. Уже сегодня.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button 
              onClick={scrollToServices}
              className="rounded-full"
            >
              Перейти к услугам <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <a 
              href={TG_MANAGER}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 px-8 text-white backdrop-blur-sm transition-colors hover:bg-zinc-800"
            >
              <Send className="mr-2 h-4 w-4" /> Заказать в Telegram
            </a>
          </div>

          <div className="mt-16 flex justify-center gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-indigo-400" />
              <span>Фото на документы</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-purple-400" />
              <span>Печать фото</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-pink-400" />
              <span>Сувениры</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section id="services" className="bg-black py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Каталог услуг</h2>
            <p className="text-zinc-500">Выберите категорию для продолжения</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/fiz/services/gifts" className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-colors group-hover:bg-zinc-800">
                <Gift className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Подарки</h3>
              <p className="mb-6 text-sm text-zinc-500 flex-grow">
                Подарочные боксы, конверты и сувениры
              </p>
              <div className="mt-auto flex items-center text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link to="/fiz/services/photo-printing" className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-colors group-hover:bg-zinc-800">
                <ImageIcon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Фотопечать</h3>
              <p className="mb-6 text-sm text-zinc-500 flex-grow">
                Печать снимков 10х15, А4, А3
              </p>
              <div className="mt-auto flex items-center text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link to="/fiz/services/documents" className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-colors group-hover:bg-zinc-800">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Документы</h3>
              <p className="mb-6 text-sm text-zinc-500 flex-grow">
                Копирование, печать, сканирование, фото на документы
              </p>
              <div className="mt-auto flex items-center text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link to="/fiz/services/ai-design" className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-colors group-hover:bg-zinc-800">
                <Camera className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">AI & Дизайн</h3>
              <p className="mb-6 text-sm text-zinc-500 flex-grow">
                AI-портреты, дизайн, оживление фото
              </p>
              <div className="mt-auto flex items-center text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
