// OffsetServicePage.js
// Displays detailed information about a single offset printing service for legal clients.
// Looks up the service by slug from the offsetServices data file. If no service is
// found, displays an error message. Provides a link back to the list of legal
// services.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { offsetServices } from '../data/offsetServices';

const OffsetServicePage = () => {
  const { serviceSlug } = useParams();
  const service = offsetServices.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="service-page">
        <h1>Услуга не найдена</h1>
        <p>К сожалению, запрошенная услуга не существует.</p>
        <Link to="/legal" className="btn btn-primary">
          Вернуться к услугам
        </Link>
      </div>
    );
  }

  // Prepare detailed content: split the details string into paragraphs and bullet points.
  let paragraphs = [];
  let bullets = [];
  if (service.details) {
    const lines = service.details.split('\n').map((l) => l.trim()).filter((l) => l !== '');
    lines.forEach((line) => {
      if (line.startsWith('•')) {
        bullets.push(line.substring(1).trim());
      } else {
        paragraphs.push(line);
      }
    });
  }

  return (
    <div className="service-page">
      <div className="service-content">
        {/* Left side: service image */}
        {service.image && (
          <div className="service-image">
            {/* Prefix with PUBLIC_URL to correctly resolve images stored in the public folder */}
            <img src={process.env.PUBLIC_URL + service.image} alt={service.title} />
          </div>
        )}
        {/* Right side: text content */}
        <div className="service-text">
          <h1>{service.title}</h1>
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          {bullets.length > 0 && (
            <ul>
              {bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          <p>
            <strong>Цена:</strong> {service.price}
          </p>
          {/* Buttons row inside the text area */}
          <div className="service-buttons">
            <Link to="/legal" className="btn btn-primary">
              Назад к услугам
            </Link>
            <a
              href="https://t.me/aiprintperm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-telegram"
            >
              Написать менеджеру в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffsetServicePage;