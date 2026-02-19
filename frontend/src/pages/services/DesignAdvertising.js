// DesignAdvertising.js
// Detailed page for design and advertising services.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const DesignAdvertising = () => {
  return (
    <>
      <div className="service-page">
        <h1>Дизайн и реклама</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/design.png'}
          alt="Дизайн и реклама"
          className="service-page__image"
        />
        <p>
          Разрабатываем макеты и&nbsp;рекламные материалы для вашего бизнеса.
          Создаём фирменный стиль, логотипы, баннеры и&nbsp;креативные
          концепции. Мы&nbsp;внимательно изучаем ваш бренд и&nbsp;предлагаем
          индивидуальные решения.
        </p>
        <p>
          <strong>Стоимость:</strong> от&nbsp;500&nbsp;₽ за&nbsp;макет.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;2&nbsp;дней.
        </p>
        {/* Minimal order card for this service */}
        <OrderCard serviceTitle="Дизайн и реклама" />
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default DesignAdvertising;