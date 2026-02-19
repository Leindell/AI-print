// Payment.js
// Page shown after an order is submitted.  In a full implementation this
// page would integrate with a payment gateway (e.g. the SBP system) and
// handle payment confirmation.  For now it simply thanks the user and
// provides instructions on how to proceed.

import React from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
  return (
    <div className="payment-page" style={{ textAlign: 'center', maxWidth: '600px', margin: '2rem auto', color: '#f5f5f5' }}>
      <h1>Оформление заказа</h1>
      <p style={{ marginTop: '1rem' }}>
        Ваш заказ успешно оформлен! Мы получили ваши файлы и начнём печать
        после подтверждения оплаты.
      </p>
      <p>
        В ближайшее время мы свяжемся с вами для уточнения деталей. Если
        хотите оплатить через Систему быстрых платежей (СБП), перейдите
        по инструкции в конце этого сообщения.
      </p>
      <p>
        Пока что этот раздел носит демонстрационный характер. Для быстрой
        связи используйте наш Telegram: <a href="https://t.me/aiprintperm" target="_blank" rel="noopener noreferrer">@aiprintperm</a>.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        На главную
      </Link>
    </div>
  );
};

export default Payment;