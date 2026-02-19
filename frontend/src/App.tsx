import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingSplitter } from './pages/LandingSplitter';
import { FizHome } from './pages/fiz/FizHome';
import { JurHome } from './pages/jur/JurHome';
import { CategoryPage } from './pages/CategoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root Splitter */}
        <Route path="/" element={<LandingSplitter />} />

        {/* Fiz Section */}
        <Route path="/fiz" element={<Layout type="fiz" />}>
          <Route index element={<FizHome />} />
          <Route path="services" element={<FizHome />} />
          <Route path="services/:categorySlug" element={<CategoryPage type="fiz" />} />
          <Route path="services/:categorySlug/:serviceSlug" element={<ServiceDetailPage type="fiz" />} />
        </Route>

        {/* Jur Section */}
        <Route path="/jur" element={<Layout type="jur" />}>
          <Route index element={<JurHome />} />
          <Route path="services" element={<JurHome />} />
          <Route path="services/:categorySlug" element={<CategoryPage type="jur" />} />
          <Route path="services/:categorySlug/:serviceSlug" element={<ServiceDetailPage type="jur" />} />
        </Route>

        {/* Common Pages */}
        <Route element={<Layout type="common" />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
