// CategoryPage.js
// Dynamic page to display all services within a particular category. It
// retrieves the category slug from the URL and looks up the relevant data
// from servicesData. Each service is listed with a link to its own page
// and a short price hint.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../../data/servicesData';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="service-page">
        <h1>Категория не найдена</h1>
        <p>Извините, выбранная категория не существует.</p>
        <Link to="/services" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
    );
  }

  return (
    <div className="service-page">
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <ul className="category-service-list">
        {category.services.map((service) => (
          <li key={service.slug} className="category-service-item">
            <Link
              to={`/services/${category.slug}/${service.slug}`}
              className="category-service-link"
            >
              {service.title}
            </Link>
            <span className="category-service-price"> — {service.price}</span>
          </li>
        ))}
      </ul>
      <Link to="/services" className="btn btn-primary">
        Вернуться к услугам
      </Link>
    </div>
  );
};

export default CategoryPage;