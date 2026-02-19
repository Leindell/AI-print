// ServiceCard.js
// Reusable component to display individual services. Accepts a title and
// description as props. Additional props such as an image or price can be
// added later.

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Card component to present details about a specific service. Using
 * descriptive headings and concise text helps visitors quickly grasp
 * what is offered. Styling is handled via external CSS for flexibility.
 */
const ServiceCard = ({ title, description, link, subServices = [], categorySlug, image }) => {
  return (
    <div className="service-card">
      {image && (
        <img
          src={process.env.PUBLIC_URL + image}
          alt={title}
          className="service-card__image"
        />
      )}
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
      {/* If sub-services are provided, render them as a list of links. They appear when hovering over the card via CSS. */}
      {subServices && subServices.length > 0 && (
        <ul className="sub-service-list">
          {subServices.map((sub) => (
            <li key={sub.slug} className="sub-service-item">
              <Link to={`/services/${categorySlug}/${sub.slug}`} className="sub-service-link">
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* For categories that also have a general page, show a call-to-action */}
      {link && !subServices?.length && (
        <div style={{ marginTop: '1rem' }}>
          <Link to={link} className="btn btn-primary">
            Подробнее
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;