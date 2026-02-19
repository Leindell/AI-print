// servicesData.js
// Centralised data for service categories and their specific offerings. This file
// defines all categories and services available at AI Print Studio. Each
// category has a slug used in URLs, a title, description, image and an array
// of services. Each service contains its own slug, title, price, time and
// description. Updating this single file will propagate changes throughout
// the site without touching component logic.

export const categories = [
  {
    slug: 'photo',
    title: 'Фото печать',
    description: 'Форматные фотографии, AI‑портреты, реставрация и открытки.',
    image: '/img/office.png',
    services: [
      {
        slug: '10x15',
        title: 'Фото 10×15 (глянец)',
        price: '25 ₽ за фотографию',
        time: 'от 5 минут',
        description:
          'Печать фотографий размером 10×15 см на глянцевой фотобумаге.',
      },
      {
        slug: 'photo-a4',
        title: 'Печать фото A4',
        price: '100 ₽ за фотографию',
        time: 'от 15 минут',
        description:
          'Печать фотографий формата A4 на качественной фотобумаге.',
      },
      {
        slug: 'photo-a3',
        title: 'Печать фото A3',
        price: '350 ₽ за фотографию',
        time: 'от 30 минут',
        description:
          'Печать фотографий формата A3. Подходит для постеров и крупных снимков.',
      },
      {
        slug: 'ai-portrait',
        title: 'AI‑портрет',
        price: '250 ₽ за портрет',
        time: 'от 1 часа',
        description:
          'Создание уникального портрета с использованием нейросетевых технологий.',
      },
      {
        slug: 'photo-restoration',
        title: 'Оживление фото',
        price: '200 ₽',
        time: 'от 1 дня',
        description:
          'Восстановление и колоризация старых фотографий, улучшение качества.',
      },
      {
        slug: 'greeting-cards',
        title: 'Праздничные открытки',
        price: '150 ₽',
        time: 'от 1 дня',
        description:
          'Дизайн и печать индивидуальных открыток ко всем праздникам.',
      },
    ],
  },
  {
    slug: 'documents',
    title: 'Копирование и сканирование',
    description:
      'Копирование, сканирование, ламинирование и печать документов любого формата.',
    image: '/img/qr.png',
    services: [
      {
        slug: 'passport-photo',
        title: 'Фото на документы',
        price: '100 ₽',
        time: 'от 10 минут',
        description:
          'Фото на паспорт, визу, водительское удостоверение и другие документы.',
      },
      {
        slug: 'copy-doc',
        title: 'Копирование документов',
        price: 'от 5 ₽ за страницу',
        time: 'от 5 минут',
        description:
          'Чёрно‑белое и цветное копирование документов любого формата.',
      },
      {
        slug: 'scan',
        title: 'Сканирование',
        price: 'от 10 ₽ за страницу',
        time: 'от 5 минут',
        description:
          'Сканирование документов в высоком разрешении с сохранением в PDF или изображение.',
      },
      {
        slug: 'laminating',
        title: 'Ламинирование',
        price: 'от 50 ₽ за лист',
        time: 'от 10 минут',
        description:
          'Ламинирование документов, сертификатов и фотографий.',
      },
      {
        slug: 'print-a4-usb',
        title: 'Печать A4 (с флешки)',
        price: 'от 15 ₽ за страницу',
        time: 'от 5 минут',
        description:
          'Печать документов и изображений формата A4 с вашего носителя (USB).',
      },
      {
        slug: 'prepress',
        title: 'Подготовка макета к печати',
        price: 'от 300 ₽',
        time: 'от 1 дня',
        description:
          'Подготовка и проверка макета перед печатью, корректировка размеров и цветов.',
      },
    ],
  },
  {
    slug: 'printing',
    title: 'Полиграфия и дизайн',
    description:
      'Визитки, сертификаты, листовки, AI‑дизайн и подарки для вашего бренда.',
    image: '/img/printing.png',
    services: [
      {
        slug: 'business-cards',
        title: 'Печать визиток',
        price: 'от 500 ₽ за 100 шт.',
        time: 'от 1 дня',
        description:
          'Разработка дизайна и печать визитных карточек.',
      },
      {
        slug: 'certificates-brochures',
        title: 'Сертификаты и листовки',
        price: 'зависит от тиража',
        time: 'от 2 дней',
        description:
          'Печать рекламных листовок, брошюр и сертификатов.',
      },
      {
        slug: 'ai-design',
        title: 'AI‑Дизайн',
        price: 'от 500 ₽',
        time: 'от 2 дней',
        description:
          'Создание дизайна с помощью нейросетей для вашего бренда или продукта.',
      },
      {
        slug: 'gifts',
        title: 'Подарки и сувениры',
        price: 'от 300 ₽',
        time: 'от 3 дней',
        description:
          'Изготовление персонализированных подарков и сувенирной продукции.',
      },
    ],
  },
];