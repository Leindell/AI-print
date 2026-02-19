// Home.js
// The landing page for AI Print Studio. Provides a welcoming introduction
// to the company, summarizing the core services and inviting users to
// explore further. This page emphasises speed and quality of printing,
// drawing inspiration from the business description in search results
// mentioning fast polaroid photo printing【958412501063179†L1-L3】.

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>AI.Print Studio</h1>
        <p className="hero__subtitle">
          Ваш партнёр по быстрой и качественной печати. Фотографии, документы,
          полиграфия — все в одном месте.
        </p>
        <Link to="/services" className="btn btn-primary">Смотреть услуги</Link>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Скорость</h2>
          <p>
            Мы знаем, что время ценно. Современное оборудование позволяет
            напечатать фото и документы в кратчайшие сроки.
          </p>
        </div>
        <div className="feature">
          <h2>Качество</h2>
          <p>
            Используем профессиональные материалы и проверенные технологии
            печати, обеспечивая яркие цвета и чёткие детали.
          </p>
        </div>
        <div className="feature">
          <h2>Персонализация</h2>
          <p>
            Каждый заказ уникален. Мы предлагаем дизайн рекламы, печать на
            одежде и индивидуальные решения для вашего бренда.
          </p>
        </div>
      </section>

      {/* Reviews section: some highlights from customer feedback on Yandex */}
      <section className="reviews" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h2>Отзывы клиентов</h2>
        <div className="review-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <blockquote style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#cccccc' }}>
            «Пять звезд мало для такой качественной печати. Всё сделали максимально
            быстро, яркие краски, приятная бумага. Однозначно рекомендую!»
          </blockquote>
          <blockquote style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#cccccc' }}>
            «Печатаюсь здесь не первый раз: всегда чётко, профессионально и
            доброжелательно. Спасибо за сервис!»
          </blockquote>
          <p style={{ color: '#888888', fontSize: '0.9rem' }}>— отзывы с Яндекс Карт</p>
        </div>
      </section>

      {/* Yandex rating section.  Positioned near the reviews at the bottom
          of the page.  Uses CSS rather than a white PNG, ensuring the
          badge fits the dark theme. */}
      <section className="yandex-rating" aria-label="Рейтинг на Яндекс Картах">
        <div className="yandex-icon">Я</div>
        <div className="rating-text">
          <div className="stars" aria-hidden="true">
            {/* Five filled stars to represent a 5/5 rating */}
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <p className="rating-score">5,0&nbsp;/&nbsp;5,0</p>
          <p className="rating-caption">Хорошее место на&nbsp;Яндекс Картах</p>
          <p className="rating-subtext">На&nbsp;основании отзывов наших клиентов</p>
        </div>
      </section>
    </div>
  );
};

export default Home;