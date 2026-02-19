// PhotoPrint.js
// Detailed page for the photo printing service.

import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const PhotoPrint = () => {
  return (
    <>
      <div className="service-page">
        <h1>Печать фотографий</h1>
        <img
          src={process.env.PUBLIC_URL + '/img/office.png'}
          alt="Печать фотографий"
          className="service-page__image"
        />
        <p>
          Мы&nbsp;печатаем фотографии любого формата, включая моментальные
          полароидные снимки. Яркие краски и&nbsp;долговечность — наш стандарт.
        </p>
        <p>
          <strong>Стоимость:</strong> от&nbsp;30&nbsp;₽ за&nbsp;фотографию.
        </p>
        <p>
          <strong>Срок исполнения:</strong> от&nbsp;10&nbsp;минут.
        </p>
        <OrderCard serviceTitle="Печать фотографий" />
        <Link to="/services" className="btn btn-primary">Вернуться к услугам</Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default PhotoPrint;