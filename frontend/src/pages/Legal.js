// Legal.js
// Page for legal entity clients. Reuses the hero section from the home page
// and lists offset printing services. Each service has a description and price.

import React from 'react';
import { Link } from 'react-router-dom';
import { offsetServices } from '../data/offsetServices';

const Legal = () => {
  return (
    <div className="legal-page">
      {/* Hero section replicating the home page banner */}
      <header className="hero">
        <h1>AI.Print Studio — для юридических лиц</h1>
        <p className="hero__subtitle">
          Надёжный партнёр по комплексной офсетной полиграфии: рекламные материалы,
          корпоративные документы, каталоги, календари и многое другое.
        </p>
      </header>
      {/* Offset services section */}
      <section className="offset-services">
        <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
          Услуги офсетной типографии
        </h2>
        <p style={{ textAlign: 'center', color: '#cccccc', marginBottom: '2rem' }}>
          Выберите услугу для юридического лица, чтобы узнать подробнее.
        </p>
        <div className="service-list">
          {offsetServices.map((service) => (
            <Link
              to={`/legal/${service.slug}`}
              key={service.slug}
              className="service-card offset-card"
              style={{ textDecoration: 'none' }}
            >
              {/* Image representing the service */}
              {service.image && (
                // Use PUBLIC_URL prefix so that images from the public folder load correctly
                <img
                  src={process.env.PUBLIC_URL + service.image}
                  alt={service.title}
                  className="service-card__image"
                />
              )}
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <p className="service-card__price">
                <strong>Цена:</strong> {service.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Legal;