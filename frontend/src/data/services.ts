import { LucideIcon, Printer, FileText, Image, Briefcase, Box, Layers, PenTool, Calendar, CreditCard, Scissors } from 'lucide-react';

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc?: string;
  fullDesc?: string;
  price: string;
  deadline?: string;
  orderSteps?: string[];
  details?: string[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  services: Service[];
}

export const FIZ_CATEGORIES: Category[] = [
  {
    id: "photos",
    slug: "photo-print",
    title: "Фотопечать",
    description: "Печать снимков любых форматов, от Polaroid до А4",
    icon: Image,
    services: [
      {
        id: "f1",
        slug: "polaroid",
        title: "Печать Polaroid",
        shortDesc: "В стиле ретро снимков",
        fullDesc: "Классический формат 10x12 см с белой рамкой. Идеально для мудбордов, подарков и сохранения воспоминаний в винтажном стиле. Печать на плотной фотобумаге.",
        price: "от 45 ₽/шт",
        deadline: "15 мин",
        orderSteps: ["Загрузите фото", "Выберите количество", "Оплатите онлайн или при получении"]
      },
      {
        id: "f2",
        slug: "10x15",
        title: "Стандарт 10x15",
        shortDesc: "Классическая фотопечать",
        fullDesc: "Самый популярный формат для фотоальбомов. Глянцевая или матовая бумага на выбор. Высокая цветопередача.",
        price: "от 15 ₽/шт",
        deadline: "1 час",
        orderSteps: ["Пришлите фото", "Укажите тип бумаги", "Заберите заказ"]
      },
      {
        id: "f3",
        slug: "a4",
        title: "Печать А4",
        shortDesc: "Большие снимки",
        fullDesc: "Формат 21x30 см. Подходит для портретов и вставки в рамки.",
        price: "от 80 ₽/шт",
        deadline: "1 час"
      }
    ]
  },
  {
    id: "docs",
    slug: "documents",
    title: "Документы",
    description: "Копирование, сканирование, печать файлов",
    icon: FileText,
    services: [
      { 
        id: "f4", 
        slug: "copy", 
        title: "Ксерокопия", 
        shortDesc: "Ч/Б и цветная",
        fullDesc: "Быстрая ксерокопия документов. Автоматическая подача для больших объемов.",
        price: "10 ₽/стр",
        deadline: "Моментально"
      },
      { 
        id: "f5", 
        slug: "scan", 
        title: "Сканирование", 
        shortDesc: "В PDF или JPG",
        fullDesc: "Сканирование документов с отправкой на почту или записью на флешку.",
        price: "15 ₽/стр",
        deadline: "Моментально"
      },
      {
        id: "f6",
        slug: "print-docs",
        title: "Распечатка",
        shortDesc: "С флешки или почты",
        fullDesc: "Печать документов с любых носителей. Ч/Б и цветная печать.",
        price: "от 10 ₽/стр",
        deadline: "Моментально"
      }
    ]
  },
  {
    id: "souvenirs",
    slug: "souvenirs",
    title: "Сувениры",
    description: "Печать на кружках, футболках, холстах",
    icon: Box,
    services: [
      {
        id: "f7",
        slug: "mugs",
        title: "Печать на кружках",
        shortDesc: "Белые и цветные",
        fullDesc: "Нанесение любого изображения или надписи на керамическую кружку. Стойкое покрытие.",
        price: "от 450 ₽",
        deadline: "1 день"
      },
      {
        id: "f8",
        slug: "tshirts",
        title: "Печать на футболках",
        shortDesc: "Принты любой сложности",
        fullDesc: "Прямая печать или термоперенос. Футболки из 100% хлопка в наличии.",
        price: "от 900 ₽",
        deadline: "1-2 дня"
      }
    ]
  }
];

export const JUR_CATEGORIES: Category[] = [
  {
    id: "polygraphy",
    slug: "polygraphy",
    title: "Полиграфия",
    description: "Визитки, листовки, буклеты для бизнеса",
    icon: Layers,
    services: [
      {
        id: "j1",
        slug: "business-cards",
        title: "Визитки",
        shortDesc: "Цифровая и офсетная печать",
        fullDesc: "Стандартные визитки 90x50 мм или евроформат. Мелованная бумага 300г, лен, touch cover.",
        price: "от 2.5 ₽/шт",
        details: ["Тиражи от 100 шт", "Срок от 1 часа", "Дизайн макета"]
      },
      {
        id: "j2",
        slug: "flyers",
        title: "Листовки",
        shortDesc: "А6, А5, А4",
        fullDesc: "Рекламные листовки для раздачи и стоек. Офсетная печать больших тиражей.",
        price: "от 1.8 ₽/шт",
        details: ["Тиражи от 1000 шт", "Глянцевая бумага 130г"]
      },
      {
        id: "j3",
        slug: "booklets",
        title: "Буклеты",
        shortDesc: "Евробуклеты, 2 фальца",
        fullDesc: "Информационные буклеты для выставок и офисов.",
        price: "от 15 ₽/шт"
      }
    ]
  },
  {
    id: "large-format",
    slug: "large-format",
    title: "Широкоформатная печать",
    description: "Баннеры, плакаты, чертежи",
    icon: Printer,
    services: [
      { 
        id: "j4", 
        slug: "banners", 
        title: "Баннеры", 
        shortDesc: "Люверсы, проклейка",
        fullDesc: "Печать на баннерной ткани Frontlit. Устойчивость к выгоранию.",
        price: "от 450 ₽/м²" 
      },
      { 
        id: "j5", 
        slug: "drawings", 
        title: "Печать чертежей", 
        shortDesc: "А2, А1, А0",
        fullDesc: "Инженерная печать чертежей и схем. Фальцовка по ГОСТ.",
        price: "от 150 ₽/лист" 
      }
    ]
  },
  {
    id: "branding",
    slug: "branding",
    title: "Брендирование",
    description: "Сувенирная продукция с логотипом",
    icon: Briefcase,
    services: [
      {
        id: "j6",
        slug: "calendars",
        title: "Календари",
        shortDesc: "Квартальные, настольные",
        fullDesc: "Фирменные календари с логотипом компании. Отличный корпоративный подарок.",
        price: "от 250 ₽/шт"
      },
      {
        id: "j7",
        slug: "pens",
        title: "Ручки с логотипом",
        shortDesc: "Тампопечать, гравировка",
        fullDesc: "Нанесение логотипа на пластиковые и металлические ручки.",
        price: "от 35 ₽/шт"
      }
    ]
  }
];
