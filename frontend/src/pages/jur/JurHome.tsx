import React from 'react';
import { ArrowDown, Zap, Star, PenTool, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/Logo';
import { motion } from 'motion/react';

export const JurHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Hero Section */}
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        {/* Background Effects - Emerald/Green Theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 backdrop-blur-md">
            <Logo className="h-4 w-4 text-white" />
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Ai.Print <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Studio</span>
          </h1>

          <p className="mb-8 text-xl text-zinc-400 md:text-2xl max-w-2xl">
            Корпоративная полиграфия и брендирование. <br/>
            Индивидуальный подход, точные сроки и высокое качество.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              onClick={scrollToServices}
              size="lg" 
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-14 text-lg"
            >
              Перейти к услугам <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-zinc-400">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span>Скорость</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-teal-400" />
              <span>Качество</span>
            </div>
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-green-400" />
              <span>AI Дизайн</span>
            </div>
          </div>
        </div>
      </div>

      {/* Informational Section for Business */}
      <div id="services" className="container mx-auto px-4 py-24">
        
        {/* 1. Intro Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl tracking-tight">
            Работаем с юридическими лицами
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Теперь мы официально работаем с юридическими лицами и беремся за большие тиражи. 
            Если вашему бизнесу нужны объемы, стабильность и четкие сроки — вы по адресу.
          </p>
        </motion.div>

        {/* 2. Two Columns: Production & Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Card 1: Production */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 md:p-12 flex flex-col hover:border-emerald-500/30 hover:bg-zinc-900/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Производим
            </h3>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "книги, журналы, брошюры",
                "газеты и буклеты",
                "листовки и плакаты",
                "календари и ежедневники",
                "тетради и блокноты",
                "бланки, грамоты, дипломы",
                "конверты, папки",
                "простые этикетки",
                "открытки и комплекты открыток",
                "бирки, маленькие коробочки",
                "переплетные крышки",
                "и другую офсетную продукцию"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-600 group-hover:bg-emerald-500 transition-colors shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/20 h-14 text-lg rounded-xl transition-all active:scale-95"
              onClick={() => window.open('https://t.me/leindell', '_blank')}
            >
              Написать менеджеру
            </Button>
          </motion.div>

          {/* Card 2: Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 md:p-12 flex flex-col hover:border-emerald-500/30 hover:bg-zinc-900/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
              Возможности производства
            </h3>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "офсетная печать",
                "печать CMYK, пантонами и металлизированной краской",
                "ламинация",
                "тиснение фольгой",
                "горячее тиснение",
                "конгревное тиснение"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-600 group-hover:bg-teal-500 transition-colors shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/20 h-14 text-lg rounded-xl transition-all active:scale-95"
              onClick={() => window.open('https://t.me/leindell', '_blank')}
            >
              Написать менеджеру
            </Button>
          </motion.div>
        </div>

        {/* 3. Conditions Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black p-8 md:p-16 mb-24 relative overflow-hidden group hover:border-emerald-500/20 transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
          
          <h3 className="text-3xl font-bold text-white mb-12 text-center relative z-10">Условия и минимальные объёмы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10">
            {[
              "Крупные тиражи и регулярные поставки",
              "Работаем по договору",
              "Полный пакет документов",
              "Сроки фиксируем заранее",
              "Минимальный объём заказа обсуждается с менеджером",
              "Подготовим расчёт под вашу задачу"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-900/10 transition-all duration-300">
                <div className="mt-1 h-6 w-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-zinc-300 font-medium group-hover:text-zinc-200 transition-colors">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center relative z-10">
            <Button 
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-500 px-10 h-16 text-xl rounded-full shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 hover:shadow-emerald-500/20"
              onClick={() => window.open('https://t.me/leindell', '_blank')}
            >
              Обсудить и получить расчёт
            </Button>
          </div>
        </motion.div>

        {/* 4. Final CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            Берем на себя крупные объемы, соблюдаем сроки, работаем по договору и с полным пакетом документов.
            Если вам нужен надежный подрядчик для регулярных или масштабных заказов — напишите нам. Обсудим задачу и подготовим расчет.
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 px-10 h-16 text-lg rounded-full transition-all hover:scale-105"
            onClick={() => window.open('https://t.me/leindell', '_blank')}
          >
            <Send className="mr-2 h-5 w-5" />
            Связаться в Telegram
          </Button>
        </motion.div>

      </div>
    </div>
  );
};
