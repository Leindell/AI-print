// ContactBanner.js
// A reusable banner component that displays a call to action urging
// visitors to reach out via Telegram for detailed order assistance.  It
// is styled to float in a corner of the viewport via the `contact-banner`
// class defined in styles.css.  The component uses an anchor tag to
// ensure it is keyboard accessible and opens the Telegram link in a new
// tab to avoid navigating users away from the site inadvertently.

import React from 'react';

const ContactBanner = () => {
  return (
    <a
      href="https://t.me/aiprintperm"
      className="contact-banner"
      target="_blank"
      rel="noopener noreferrer"
    >
      Для более детального оформления заказа<br />
      рекомендуем связаться с менеджером в Telegram
    </a>
  );
};

export default ContactBanner;