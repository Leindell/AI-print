// Printing.js
// Detailed page for operational and offset printing services.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const Printing = () => {
  return (
    <>
      <div className="service-page">
        <h1>Оперативная и офсетная печать</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/printing.png'}
          alt="Оперативная и офсетная печать"
          className="service-page__image"
        />
        <p>
          Изготавливаем визитки, листовки, брошюры, сертификаты и&nbsp;другую
          полиграфическую продукцию. Оперативная цифровая печать подходит для
          небольших тиражей, а&nbsp;офсетная&nbsp;— для крупных заказов. Поможем
          выбрать подходящий формат и&nbsp;материал.
        </p>
        <p>
          <strong>Стоимость:</strong> рассчитывается индивидуально в&nbsp;зависимости
          от&nbsp;тиража и&nbsp;материалов.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;1&nbsp;дня.
        </p>
        <OrderCard serviceTitle="Оперативная и офсетная печать" />
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default Printing;