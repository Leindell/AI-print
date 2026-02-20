import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  type?: 'fiz' | 'jur' | 'common';
}

export const Layout: React.FC<LayoutProps> = ({ type = 'common' }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 font-sans antialiased">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
