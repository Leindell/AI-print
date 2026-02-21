export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  category: 'fiz' | 'jur';
  subcategory: 'gifts' | 'photo-printing' | 'documents' | 'ai-design';
  slug: string;
}

export const services: Service[] = [
  // Gifts
  {
    id: '1',
    title: 'Подарочный бокс',
    description: 'Бокс с вашими фото в стиле полароид от 8 до 15 фото + уникальное наполнение открытка + стикер + 3д сткер + пробник духов',
    price: 490,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'gifts',
    slug: 'gift-box'
  },
  {
    id: '2',
    title: 'Подарочный конверт',
    description: 'Подарочный конверт с вашими фото в стиле полароид от 4 до 9 шт',
    price: 290,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'gifts',
    slug: 'gift-envelope'
  },

  // Photo Printing
  {
    id: '3',
    title: 'Печать фото 10х15 (Глянец)',
    description: 'Качественная печать фотографий 10х15 на глянцевой бумаге',
    price: 25,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'photo-printing',
    slug: 'photo-10x15'
  },
  {
    id: '10',
    title: 'Печать фото А4',
    description: 'Печать фотографий формата А4',
    price: 100,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'photo-printing',
    slug: 'photo-a4'
  },
  {
    id: '9',
    title: 'Печать фото А3',
    description: 'Печать фотографий формата А3',
    price: 350,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'photo-printing',
    slug: 'photo-a3'
  },

  // Documents
  {
    id: '8',
    title: 'Печать документов ЧБ / цвет (А4)',
    description: 'Ч/б и цветная печать документов формата А4',
    price: 10,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'documents',
    slug: 'print-documents-a4'
  },
  {
    id: '4',
    title: 'Копирование документов',
    description: 'Копирование документов',
    price: 15,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'documents',
    slug: 'copy-documents'
  },
  {
    id: '14',
    title: 'Сканирование',
    description: 'Сканирование документов',
    price: 30,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'documents',
    slug: 'scanning'
  },
  {
    id: '5',
    title: 'Ламинирование А4',
    description: 'Ламинирование документов формата А4',
    price: 50,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'documents',
    slug: 'lamination-a4'
  },
  {
    id: '15',
    title: 'Фото на документы',
    description: 'Фото на паспорт, визы, ВНЖ и другие документы',
    price: 450,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'documents',
    slug: 'photo-doc'
  },

  // AI Services / Design
  {
    id: '17',
    title: 'AI-портрет',
    description: 'AI-портрет по фото + печать; без печати цена та же',
    price: 250,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'ai-design',
    slug: 'ai-portrait'
  },
  {
    id: '16',
    title: 'AI-Дизайн',
    description: 'Уникальные открытки и креативы с помощью нейросетей',
    price: 250,
    unit: 'услуга',
    category: 'fiz', // Changed to fiz as per request to group under AI-services
    subcategory: 'ai-design',
    slug: 'ai-design'
  },
  {
    id: '7',
    title: 'Оживление фото',
    description: 'Оживление фото с помощью AI-технологий',
    price: 100,
    unit: 'шт.',
    category: 'fiz',
    subcategory: 'ai-design',
    slug: 'ai-photo-animate'
  },
  {
    id: '6',
    title: 'Подготовка макета к печати',
    description: 'Профессиональная подготовка макетов визиток, листовок, сертификатов и др.',
    price: 500,
    unit: 'услуга',
    category: 'fiz', // Changed to fiz as per request to group under AI-services/Design
    subcategory: 'ai-design',
    slug: 'layout-design'
  },
  
  // Keeping Jur services for reference but they won't be shown in catalog
  {
    id: '11',
    title: 'Визитки',
    description: 'Оперативная печать визиток небольшими тиражами',
    price: 10,
    unit: 'шт.',
    category: 'jur',
    subcategory: 'ai-design', // Placeholder
    slug: 'business-cards'
  },
  {
    id: '13',
    title: 'Сертификаты / листовки / флаеры',
    description: 'Печать сертификатов, листовок и флаеров',
    price: 15,
    unit: 'шт.',
    category: 'jur',
    subcategory: 'ai-design', // Placeholder
    slug: 'flyers'
  }
];
