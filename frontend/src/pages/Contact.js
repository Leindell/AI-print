// Contact.js
// Page for users to get in touch with AI Print Studio. Contains a simple
// feedback form that posts to the backend API and displays success or
// error messages. Also repeats key contact information for convenience.

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      setStatus('Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Не удалось отправить сообщение. Попробуйте ещё раз позже.');
    }
  };

  return (
    <div className="contact">
      <h1>Свяжитесь с нами</h1>
      <p>
        Мы всегда рады обратной связи. Заполните форму, и мы ответим вам в
        ближайшее время.
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
      {status && <p className="status success">{status}</p>}
      {error && <p className="status error">{error}</p>}
      <div className="contact-info">
        <h2>Контактные данные</h2>
        <p>Адрес: Пермь, Переселенческая ул., 100, офис 1</p>
        <p>Телефон: +7 995 858‑30‑35</p>
        <p>Часы работы: ежедневно 13:00 – 22:00</p>
        <p>Электронная почта: info@ai-print.studio</p>
      </div>

      {/* Yandex Map embed (wide) + route link */}
      <div className="map-container">
        <iframe
          title="AI.Print Studio на карте"
          src="https://yandex.ru/map-widget/v1/?ll=56.179156%2C57.996158&z=16&pt=56.179156,57.996158,pm2rdm"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <div className="map-actions">
          <a
            className="map-action"
            href="https://yandex.ru/maps/?rtext=~57.996158%2C56.179156"
            target="_blank"
            rel="noopener noreferrer"
          >
            Построить маршрут
          </a>
          <a
            className="map-action map-action--secondary"
            href="https://yandex.ru/maps/?text=%D0%9F%D0%B5%D1%80%D0%B5%D1%81%D0%B5%D0%BB%D0%B5%D0%BD%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20100%20%D0%9F%D0%B5%D1%80%D0%BC%D1%8C"
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть в Яндекс Картах
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;