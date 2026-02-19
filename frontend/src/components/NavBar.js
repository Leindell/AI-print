// NavBar.js
// Top navigation bar for the AI Print Studio site.
// Contains links to all main sections of the website. The styling is kept
// deliberately minimalist to complement a black‑and‑white theme. Feel free
// to adjust the CSS classes or extend this component as the project grows.

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation component for the site. Uses React Router `Link` elements
 * instead of anchor tags to avoid page reloads. The links correspond
 * to the routes defined in App.js.
 */
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo-link">
          {/* Используем вариант логотипа с белым изображением на чёрном фоне */}
          <img
            src={process.env.PUBLIC_URL + '/img/logo_white.png'}
            alt="AI.Print Logo"
            className="navbar__logo"
          />
        </Link>
      </div>
      <div className="navbar__menu">
        <Link to="/personal" className="navbar__menu-link">Физ. лица</Link>
        <span className="navbar__divider">|</span>
        <Link to="/legal" className="navbar__menu-link">Юр. лица</Link>
        <span className="navbar__divider">|</span>
        <Link to="/about" className="navbar__menu-link">О нас</Link>
        <span className="navbar__divider">|</span>
        <Link to="/contact" className="navbar__menu-link">Контакты</Link>
      </div>
    </nav>
  );
};

export default NavBar;