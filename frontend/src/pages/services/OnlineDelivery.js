// OnlineDelivery.js
// Detailed page for online services and delivery.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const OnlineDelivery = () => {
  return (
    <>
      <div className="service-page">
        <h1>Онлайн‑услуги и доставка</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/qr.png'}
          alt="Онлайн‑услуги и доставка"
          className="service-page__image"
        />
        <p>
          Вам не нужно приезжать в&nbsp;офис. Отправляйте файлы онлайн,
          оплачивайте заказ любым удобным способом и&nbsp;получите готовую
          продукцию с&nbsp;доставкой по&nbsp;городу. Мы&nbsp;заботимся о&nbsp;вашем времени
          и&nbsp;удобстве.
        </p>
        <p>
          <strong>Стоимость:</strong> зависит от&nbsp;объёма заказа и&nbsp;адреса
          доставки.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;1&nbsp;дня.
        </p>
        <OrderCard serviceTitle="Онлайн‑услуги и доставка" />
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default OnlineDelivery;