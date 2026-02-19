// Services.js
// Displays a list of services offered by AI Print Studio. The service
// information is fetched from the backend API. If the API is unavailable
// (for example during initial development), a static fallback list is
// provided. Categories are based on the business listings: photo centre,
// copy services, operational and offset printing, and advertising design【339219316284430†L95-L101】.

import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
// Import centralised service data. Using a single source of truth avoids
// discrepancies between pages and makes it easy to update prices and
// descriptions in one place. See data/servicesData.js for details.
import { categories } from '../data/servicesData';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always derive the list of top‑level services from the centralised
    // categories. Each category becomes a card on the services page. If
    // backend API support is added in the future, this logic can be
    // extended, but for now we map the static data into the shape
    // expected by ServiceCard.
    const mapped = categories.map((cat) => ({
      title: cat.title,
      description: cat.description,
      categorySlug: cat.slug,
      image: cat.image,
      subServices: cat.services.map((svc) => ({ name: svc.title, slug: svc.slug })),
      link: `/services/${cat.slug}`,
    }));
    setServices(mapped);
    setLoading(false);
  }, []);

  return (
    <div className="services">
      <h1>Наши услуги</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="service-list">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
              subServices={service.subServices}
              categorySlug={service.categorySlug}
              image={service.image}
            />
          ))}
        </div>
      )}
      {error && (
        <p className="error">Не удалось загрузить данные с сервера: {error}</p>
      )}
    </div>
  );
};

export default Services;