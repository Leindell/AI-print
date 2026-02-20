import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Zap, Star, PenTool } from 'lucide-react';
import { Button } from './ui/Button';
import { TelegramButton } from './TelegramButton';

interface SectionHeroProps {
  title: string;
  subtitle: string;
  description: string;
  onScrollToServices: () => void;
  variant?: 'fiz' | 'jur';
}

export const SectionHero: React.FC<SectionHeroProps> = ({
  title,
  subtitle,
  description,
  onScrollToServices,
  variant = 'fiz',
}) => {
  const accentColor = variant === 'fiz' ? 'indigo' : 'emerald';

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-center">
      {/* Background Gradients */}
      <div className={`absolute -top-40 -left-40 h-96 w-96 rounded-full bg-${accentColor}-500/10 blur-3xl`} />
      <div className={`absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-${accentColor}-500/10 blur-3xl`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg">AI</div>
          <span className="text-xl font-bold tracking-tight text-white">Print Studio</span>
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          {title}
        </h1>
        
        <p className="mb-8 text-xl font-medium text-zinc-200 md:text-2xl">
          {subtitle}
        </p>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            onClick={onScrollToServices}
            size="lg"
            className={`h-14 rounded-full px-8 text-lg font-semibold shadow-lg shadow-${accentColor}-500/20 hover:shadow-${accentColor}-500/30 transition-all`}
          >
            Перейти к услугам
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
          
          <TelegramButton 
            variant="outline"
            size="lg"
            className="h-14 rounded-full px-8 text-lg border-zinc-700 hover:bg-zinc-800"
          >
            Заказать в Telegram
          </TelegramButton>
        </div>
      </motion.div>

      {/* Features Grid at Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute bottom-12 left-0 right-0 hidden w-full justify-center gap-12 md:flex"
      >
        <div className="flex items-center gap-3 text-zinc-400">
          <Zap className="h-5 w-5 text-white" />
          <div className="text-left">
            <div className="font-semibold text-white">Скорость</div>
            <div className="text-xs">Готовность от 5 минут</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <Star className="h-5 w-5 text-white" />
          <div className="text-left">
            <div className="font-semibold text-white">Качество</div>
            <div className="text-xs">Премиальные материалы</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <PenTool className="h-5 w-5 text-white" />
          <div className="text-left">
            <div className="font-semibold text-white">AI Дизайн</div>
            <div className="text-xs">Генерация макетов</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
