import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer,
  Layers,
  Image as ImageIcon,
  CreditCard,
  Upload,
  ArrowRight,
  Check,
  Clock,
  Zap,
  X,
  // additional icons for new services
  Copy,
  Scan,
  Book,
  BookOpen,
  Package,
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge conditional class names
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Card component with subtle hover animations and glass styling
const Card = ({ children, className, onClick }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(255,255,255,0.05)' }}
    className={cn(
      'glass-panel rounded-2xl p-6 relative overflow-hidden group transition-colors hover:border-white/20 cursor-pointer',
      className
    )}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Button with variants for primary, outline and ghost
const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyle =
    'px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95';
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    outline: 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  };
  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

// Input field with label
const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">
      {label}
    </label>
    <input
      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-gray-700"
      {...props}
    />
  </div>
);

// Navigation bar
const Navbar = () => (
  <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-background/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-bold">
          AI
        </div>
        <span className="font-semibold tracking-tight">Print Studio</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#services" className="hover:text-white transition-colors">
          Услуги
        </a>
        <a href="#about" className="hover:text-white transition-colors">
          О нас
        </a>
        <a href="#contacts" className="hover:text-white transition-colors">
          Контакты
        </a>
      </div>
    </div>
  </nav>
);

// Hero section with call to action
const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto z-10"
    >
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
        AI.Print Studio
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Ваш партнер по быстрой и качественной печати.
        <span className="text-white block mt-2">Полиграфия будущего. Уже сегодня.</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Scroll to services section when clicking call‑to‑action buttons. */}
        <Button
          variant="primary"
          className="w-full sm:w-auto"
          onClick={() => {
            const target = document.getElementById('services');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Физ. Лица <ArrowRight size={16} />
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            const target = document.getElementById('services');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Юр. Лица
        </Button>
      </div>
    </motion.div>
  </section>
);

// Services grid with clickable cards
const BentoGrid = ({ onSelectService }) => {
  // Expanded list of available services. Each object represents a service card
  // shown in the grid. Feel free to adjust the descriptions and icon assignments
  // to better reflect your actual offerings.
  const services = [
    {
      id: 'print',
      title: 'Печать ЧБ/Цвет',
      desc: 'Листовки, флаеры, документы',
      icon: <Printer size={32} />, col: 'md:col-span-2',
    },
    {
      id: 'scan',
      title: 'Сканирование',
      desc: 'Документы, чертежи, фотографии',
      icon: <Scan size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'copy',
      title: 'Копирование',
      desc: 'Быстрое копирование документов',
      icon: <Copy size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'laminate',
      title: 'Ламинирование',
      desc: 'Защита документов плёнкой',
      icon: <Layers size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'binding',
      title: 'Переплет',
      desc: 'Спиральный, термический',
      icon: <Book size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'brochure',
      title: 'Брошюровка',
      desc: 'Каталоги, брошюры, отчеты',
      icon: <BookOpen size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'photo',
      title: 'Фотопечать',
      desc: 'Плакаты, постеры, холсты',
      icon: <ImageIcon size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'cards',
      title: 'Визитки',
      desc: 'Календари, продукция',
      icon: <CreditCard size={32} />, col: 'md:col-span-1',
    },
    {
      id: 'banner',
      title: 'Печать баннеров',
      desc: 'Широкий формат, наружная реклама',
      icon: <Package size={32} />, col: 'md:col-span-2',
    },
  ];
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="w-12 h-[1px] bg-white/20"></span> Услуги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <Card key={s.id} className={s.col} onClick={() => onSelectService(s)}>
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                {s.icon}
              </div>
              <ArrowRight className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-400">{s.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Modal for ordering a service
const OrderModal = ({ service, onClose }) => {
  if (!service) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <X size={24} />
          </button>
          <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
          <p className="text-sm text-gray-500 mb-6">Оформление быстрого заказа</p>
          <div className="space-y-6">
            <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>
              <span className="text-sm font-medium">Перетащите файлы сюда</span>
              <span className="text-xs text-gray-500 mt-1">или нажмите для выбора</span>
            </div>
            <Input label="Количество" type="number" defaultValue={1} min={1} />
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">
                Комментарий
              </label>
              <textarea
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-gray-700 min-h-[100px]"
                placeholder="Матовая бумага, обрезка..."
              />
            </div>
            <Button variant="primary" className="w-full py-4 text-lg">
              Оформить заказ
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Features section
const Features = () => (
  <section className="py-24 border-y border-white/5 bg-surface/30">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        {
          title: 'Скорость',
          desc: 'Готовность заказа от 5 минут. Современное оборудование.',
          icon: <Clock />,
        },
        {
          title: 'Качество',
          desc: 'Премиальные материалы и точная цветопередача.',
          icon: <Check />,
        },
        {
          title: 'AI Дизайн',
          desc: 'Генерация уникальных макетов нейросетями.',
          icon: <Zap />,
        },
      ].map((f, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center gap-3 text-white mb-2">
            {f.icon}
            <h3 className="text-xl font-bold">{f.title}</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Footer section
const Footer = () => (
  <footer id="contacts" className="py-20 px-6 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white">AI.Print</h4>
        <p className="text-gray-500 max-w-xs">
          Пермь, Переселенческая улица, 100, офис 1
        </p>
        <p className="text-gray-500">+7 995 858-30-35</p>
        <div className="flex gap-4 pt-4">
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            Telegram
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 text-sm text-gray-500">
        <div className="flex flex-col gap-3">
          <span className="text-white font-semibold mb-2">Навигация</span>
          <a href="#" className="hover:text-white">
            Главная
          </a>
          <a href="#services" className="hover:text-white">
            Услуги
          </a>
          <a href="#about" className="hover:text-white">
            О нас
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-white font-semibold mb-2">Режим работы</span>
          <span>Ежедневно: 13:00 - 22:00</span>
          <span className="text-green-500">Сейчас открыто</span>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-700">
      © 2026 AI.Print Studio. Все права защищены.
    </div>
  </footer>
);

// Root component
function App() {
  const [selectedService, setSelectedService] = useState(null);
  return (
    <div className="min-h-screen bg-background text-primary selection:bg-white selection:text-black">
      {/* Global noise overlay */}
      <div className="bg-noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BentoGrid onSelectService={setSelectedService} />
      </main>
      <Footer />
      {/* Render modal when a service is selected */}
      {selectedService && (
        <OrderModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default App;