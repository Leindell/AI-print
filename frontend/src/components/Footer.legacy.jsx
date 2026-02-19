// Footer.js
// Simple footer component showing business hours, contact information and
// social links. Information such as the address and operating hours
// comes from the public listing on Flamp/2GIS【339219316284430†L38-L94】.

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h4>Контакты</h4>
          <p>Пермь, Переселенческая улица, 100, офис 1</p>
          <p>Телефон: +7 995 858‑30‑35</p>
          <p>Telegram: <a href="https://t.me/ai_print">@ai_print</a></p>
        </div>
        <div className="footer__section">
          <h4>Режим работы</h4>
          <p>Ежедневно: 13:00 – 22:00</p>
        </div>
        <div className="footer__section">
          <h4>Навигация</h4>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/about">О нас</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} AI.Print Studio. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;