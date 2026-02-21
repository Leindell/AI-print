import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FIZ_CATEGORIES, JUR_CATEGORIES } from '../data/services';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  type: 'fiz' | 'jur';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ type }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categories = type === 'fiz' ? FIZ_CATEGORIES : JUR_CATEGORIES;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Категория не найдена</h1>
        <Link to={`/${type}`} className="text-zinc-400 hover:text-white">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to={`/${type}`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад в каталог
      </Link>

      <div className="mb-12 flex items-center gap-4">
        <div className="rounded-xl bg-zinc-800 p-4 text-white">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{category.title}</h1>
          <p className="text-zinc-400">{category.description}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.services.map((service) => (
          <Link
            key={service.id}
            to={`/${type}/services/${category.slug}/${service.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div>
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
                {service.tags && (
                  <div className="flex gap-1">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="mb-4 text-sm text-zinc-400">{service.shortDesc}</p>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
              <span className="font-mono text-sm font-medium text-white">{service.price}</span>
              <span className="text-xs text-zinc-500">{service.deadline}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
