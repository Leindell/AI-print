// ServiceDetail.js
// Generic detail page for individual sub‑services. Uses the slug from the
// URL to look up information in a local dictionary. If no information is
// found for the slug, a fallback message is shown.

import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Dictionary describing each sub‑service. Extend this object with
// additional entries as new services are added.
const serviceDetails = {
  '10x15': {
    name: 'Фото 10×15 (Глянец)',
    description: 'Печать фотографий размером 10×15 см на глянцевой фотобумаге.',
    price: 'от 20 ₽ за фотографию',
    time: 'от 5 минут',
  },
  'photo-a4': {
    name: 'Печать фото A4',
    description: 'Печать фотографий формата A4 на качественной фотобумаге.',
    price: 'от 50 ₽ за фотографию',
    time: 'от 15 минут',
  },
  'photo-a3': {
    name: 'Печать фото A3',
    description: 'Печать фотографий формата A3. Подходит для постеров и крупных снимков.',
    price: 'от 80 ₽ за фотографию',
    time: 'от 30 минут',
  },
  'ai-portrait': {
    name: 'AI‑портрет',
    description: 'Создание уникального портрета с использованием нейросетевых технологий.',
    price: 'от 300 ₽',
    time: 'от 1 часа',
  },
  'photo-restoration': {
    name: 'Оживление фото',
    description: 'Восстановление и колоризация старых фотографий, улучшение качества.',
    price: 'от 200 ₽',
    time: 'от 1 дня',
  },
  'greeting-cards': {
    name: 'Праздничные открытки',
    description: 'Дизайн и печать индивидуальных открыток ко всем праздникам.',
    price: 'от 150 ₽',
    time: 'от 1 дня',
  },
  'passport-photo': {
    name: 'Фото на документы',
    description: 'Фото на паспорт, визу, водительское удостоверение и другие документы.',
    price: 'от 100 ₽',
    time: 'от 10 минут',
  },
  'copy-doc': {
    name: 'Копирование документов',
    description: 'Чёрно‑белое и цветное копирование документов любого формата.',
    price: 'от 5 ₽ за страницу',
    time: 'от 5 минут',
  },
  'scan': {
    name: 'Сканирование',
    description: 'Сканирование документов в высоком разрешении с сохранением в PDF или изображение.',
    price: 'от 10 ₽ за страницу',
    time: 'от 5 минут',
  },
  'laminating': {
    name: 'Ламинирование',
    description: 'Ламинирование документов, сертификатов и фотографий.',
    price: 'от 50 ₽ за лист',
    time: 'от 10 минут',
  },
  'print-a4-usb': {
    name: 'Печать A4 (с флешки)',
    description: 'Печать документов и изображений формата A4 с вашего носителя (USB).',
    price: 'от 15 ₽ за страницу',
    time: 'от 5 минут',
  },
  'prepress': {
    name: 'Подготовка макета к печати',
    description: 'Подготовка и проверка макета перед печатью, корректировка размеров и цветов.',
    price: 'от 300 ₽',
    time: 'от 1 дня',
  },
  'business-cards': {
    name: 'Печать визиток',
    description: 'Разработка дизайна и печать визитных карточек.',
    price: 'от 500 ₽ за 100 шт.',
    time: 'от 1 дня',
  },
  'certificates-brochures': {
    name: 'Сертификаты, листовки и брошюры',
    description: 'Печать рекламных листовок, брошюр и сертификатов.',
    price: 'Цена зависит от тиража и выбранных материалов',
    time: 'от 2 дней',
  },
  'ai-design': {
    name: 'AI‑Дизайн',
    description: 'Создание дизайна с помощью нейросетей для вашего бренда или продукта.',
    price: 'от 500 ₽',
    time: 'от 2 дней',
  },
  'gifts': {
    name: 'Подарки и сувениры',
    description: 'Изготовление персонализированных подарков и сувенирной продукции.',
    price: 'от 300 ₽',
    time: 'от 3 дней',
  },
};

const ServiceDetail = () => {
  const { category, slug } = useParams();
  const detail = serviceDetails[slug];
  if (!detail) {
    return (
      <div className="service-page">
        <h1>Услуга не найдена</h1>
        <p>Возможно, выбранная услуга ещё не добавлена на сайт.</p>
        <Link to="/services" className="btn btn-primary">Вернуться к услугам</Link>
      </div>
    );
  }
  return (
    <div className="service-page">
      <h1>{detail.name}</h1>
      <p>{detail.description}</p>
      <p><strong>Стоимость:</strong> {detail.price}</p>
      <p><strong>Срок исполнения:</strong> {detail.time}</p>
      <Link to="/services" className="btn btn-primary">Вернуться к услугам</Link>
    </div>
  );
};

export default ServiceDetail;