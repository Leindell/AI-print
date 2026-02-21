import React from 'react';
import { Link } from 'react-router-dom';
import { FIZ_CATEGORIES } from '../../data/services';
import { ArrowDown, Camera, Image as ImageIcon, Gift, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/Logo';

export const FizHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 backdrop-blur-md">
            <Logo className="h-4 w-4 text-white" />
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Ai.Print <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Studio</span>
          </h1>

          <p className="mb-8 text-xl text-zinc-400 md:text-2xl max-w-2xl">
            Ваш партнер по быстрой и качественной печати. <br/>
            Полиграфия будущего. Уже сегодня.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              onClick={scrollToServices}
              size="lg" 
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-14 text-lg"
            >
              Перейти к услугам <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-zinc-800 bg-black/50 text-white hover:bg-zinc-900 rounded-full px-8 h-14 text-lg"
              onClick={() => window.open('https://t.me/AIPrintBot', '_blank')}
            >
              <Send className="mr-2 h-5 w-5" />
              Заказать в Telegram
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-zinc-400">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-indigo-400" />
              <span>Фото на документы</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-400" />
              <span>Печать фото</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-pink-400" />
              <span>Сувениры</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Section */}
      <div id="services" className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Каталог услуг
          </h2>
          <p className="text-zinc-400">
            Выберите категорию для продолжения
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FIZ_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/fiz/services/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900/30 p-8 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-zinc-900 p-4 text-white group-hover:bg-zinc-800 transition-colors">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">{category.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
