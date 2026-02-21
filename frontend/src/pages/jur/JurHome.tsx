import React from 'react';
import { ArrowDown, Zap, Star, Leaf, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TG_MANAGER } from '../../config/links';

export const JurHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-black px-4 text-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-600/20 blur-[120px]" />
        
        <div className="z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            <span>Работаем ежедневно</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Ai.Print <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Studio</span>
          </h1>
          
          <p className="mb-10 text-lg text-zinc-400 md:text-xl max-w-2xl mx-auto">
            Корпоративная полиграфия и брендирование.
            <br />
            Индивидуальный подход, точные сроки и высокое качество.
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={scrollToServices}
              className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm border-none"
            >
              Перейти к возможностям <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-16 flex justify-center gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Скорость</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-teal-400" />
              <span>Качество</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span>AI Дизайн</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-black py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
            Работаем с юридическими <br /> лицами
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-400">
            Теперь мы официально работаем с юридическими лицами и беремся за большие тиражи.
            Если вашему бизнесу нужны объемы, стабильность и четкие сроки — вы по адресу.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="services" className="bg-black py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Production List */}
            <div className="flex flex-col rounded-3xl border border-zinc-900 bg-zinc-950 p-8 md:p-12">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Производим
              </h3>
              <ul className="mb-12 space-y-4 text-zinc-400">
                {['Книги, журналы, брошюры', 'Газеты и буклеты', 'Листовки и плакаты', 'Календари и ежедневники', 'Тетради и блокноты', 'Бланки, грамоты, дипломы', 'Конверты, папки', 'Простые этикетки', 'Открытки и комплекты открыток', 'Бирки, маленькие коробочки', 'Переплетные крышки', 'И другую офсетную продукцию'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="h-1 w-1 rounded-full bg-zinc-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full">
                <a 
                  href={TG_MANAGER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white transition-colors hover:bg-emerald-700 h-14"
                >
                  Написать менеджеру
                </a>
              </div>
            </div>

            {/* Features List */}
            <div className="flex flex-col rounded-3xl border border-zinc-900 bg-zinc-950 p-8 md:p-12">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-white">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Возможности производства
              </h3>
              <ul className="mb-12 space-y-4 text-zinc-400">
                {['Офсетная печать', 'Печать CMYK, пантонами и металлизированной краской', 'Ламинация', 'Тиснение фольгой', 'Горячее тиснение', 'Конгревное тиснение'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="h-1 w-1 rounded-full bg-zinc-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full">
                <a 
                  href={TG_MANAGER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white transition-colors hover:bg-emerald-700 h-14"
                >
                  Написать менеджеру
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="bg-black py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/50 p-8 md:p-12">
            <h3 className="mb-12 text-center text-2xl font-bold text-white">
              Условия и минимальные объёмы
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                'Крупные тиражи и регулярные поставки',
                'Работаем по договору',
                'Полный пакет документов',
                'Сроки фиксируем заранее',
                'Минимальный объём заказа обсуждается с менеджером',
                'Подготовим расчёт под вашу задачу'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-zinc-900 bg-black p-4">
                  <div className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-6 text-center">
              <a 
                href={TG_MANAGER}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-8 font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Обсудить и получить расчёт
              </a>
              
              <p className="max-w-2xl text-xs text-zinc-500">
                Берем на себя крупные объемы, соблюдаем сроки, работаем по договору и с полным пакетом документов. 
                Если вам нужен надежный подрядчик для регулярных или масштабных заказов — напишите нам. 
                Обсудим задачу и подготовим расчет.
              </p>

              <a 
                href={TG_MANAGER}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black px-6 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-900"
              >
                <Send className="h-3 w-3" /> Связаться в Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
