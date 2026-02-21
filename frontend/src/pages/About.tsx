import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-white">О студии</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-zinc-300">
          Мы — команда профессионалов, любящих свое дело. AI.Print Studio предоставляет полный спектр полиграфических услуг, от печати фотографий до создания сложной сувенирной продукции.
        </p>
        <p className="text-lg text-zinc-300 mt-4">
          Наше оборудование позволяет выполнять заказы любой сложности в кратчайшие сроки. Мы работаем как с частными клиентами, так и с крупным бизнесом.
        </p>
      </div>
    </div>
  );
};
