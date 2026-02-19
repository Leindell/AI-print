import React from 'react';
import { FIZ_CATEGORIES } from '../../data/services';
import { CategoryCard } from '../../components/CategoryCard';
import { SectionHero } from '../../components/SectionHero';

export const FizHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <SectionHero
        title="Сохраняем моменты"
        subtitle="Печать фотографий, документов и сувениров"
        description="Быстро, качественно и с любовью. Доставка или самовывоз в день заказа."
        onScrollToServices={scrollToServices}
        variant="fiz"
      />

      <div id="services" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Каталог услуг
          </h2>
          <p className="text-zinc-400">Выберите категорию для продолжения</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FIZ_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              slug={category.slug}
              basePath="/fiz/services"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
