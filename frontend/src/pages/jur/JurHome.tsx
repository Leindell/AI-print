import React from 'react';
import { JUR_CATEGORIES } from '../../data/services';
import { CategoryCard } from '../../components/CategoryCard';
import { SectionHero } from '../../components/SectionHero';

export const JurHome: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <SectionHero
        title="Решения для бизнеса"
        subtitle="Корпоративная полиграфия и брендирование"
        description="Индивидуальный подход, точные сроки и высокое качество. Работаем с НДС."
        onScrollToServices={scrollToServices}
        variant="jur"
      />

      <div id="services" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Каталог услуг
          </h2>
          <p className="text-zinc-400">Выберите категорию для продолжения</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JUR_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              slug={category.slug}
              basePath="/jur/services"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
