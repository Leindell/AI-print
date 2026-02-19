// MerchPrint.js
// Detailed page for merchandise and apparel printing services.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const MerchPrint = () => {
  return (
    <>
      <div className="service-page">
        <h1>Печать на одежде и мерче</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/merch.png'}
          alt="Печать на одежде и мерче"
          className="service-page__image"
        />
        <p>
          Нанесём принты, логотипы и&nbsp;надписи на&nbsp;футболки, худи и&nbsp;другие
          изделия. Используем качественные текстильные изделия и&nbsp;стойкие
          красители, чтобы изображение сохранялось после многих стирок.
        </p>
        <p>
          <strong>Стоимость:</strong> от&nbsp;600&nbsp;₽ за&nbsp;изделие.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;1&nbsp;дня.
        </p>
        {/* Minimal order card for this service */}
        <OrderCard serviceTitle="Печать на одежде и мерче" />
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default MerchPrint;