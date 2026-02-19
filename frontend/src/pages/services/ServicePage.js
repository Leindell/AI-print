// ServicePage.js
// Detailed page for an individual service. Uses both category and service
// slugs from the URL to look up the appropriate object in servicesData
// and display full information such as description, price and time.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../../data/servicesData';
import OrderCard from '../../components/OrderCard';
import ContactBanner from '../../components/ContactBanner';

const ServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="service-page">
        <h1>Услуга не найдена</h1>
        <p>Возможно, выбранная услуга ещё не добавлена на сайт.</p>
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="service-page">
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <p>
          <strong>Стоимость:</strong> {service.price}
        </p>
        <p>
          <strong>Срок исполнения:</strong> {service.time}
        </p>
        {/* Minimal order card for this dynamic service */}
        <OrderCard serviceTitle={service.title} />
        <Link to={`/services/${category.slug}`} className="btn btn-primary">
          Назад к категории
        </Link>
      </div>
      <ContactBanner />
    </>
  );
};

export default ServicePage;