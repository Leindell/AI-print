// CopyScan.js
// Detailed page for copy and scanning services.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const CopyScan = () => {
  return (
    <>
      <div className="service-page">
        <h1>Копировальные услуги и сканирование</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/office.png'}
          alt="Копирование и сканирование"
          className="service-page__image"
        />
        <p>
          Предлагаем чёрно‑белое и&nbsp;цветное копирование документов,
          сканирование файлов в&nbsp;высоком разрешении и&nbsp;создание
          цифровых архивов. Наше оборудование обеспечивает точные копии без
          потери качества.
        </p>
        <p>
          <strong>Стоимость:</strong> от&nbsp;5&nbsp;₽ за&nbsp;страницу.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;5&nbsp;минут.
        </p>
        {/* Minimal order card for this service */}
        <OrderCard serviceTitle="Копировальные услуги и сканирование" />
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
      {/* Contact banner floating in the corner */}
      <ContactBanner />
    </>
  );
};

export default CopyScan;