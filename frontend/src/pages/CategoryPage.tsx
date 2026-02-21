import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { services } from '../data/services';

interface CategoryPageProps {
  type: 'fiz' | 'jur';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ type }) => {
  const { categorySlug } = useParams();

  const categoryServices = services.filter(
    s => s.category === type && s.subcategory === categorySlug
  );

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <Link 
          to={`/${type}`} 
          className="mb-8 inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Назад
        </Link>

        <h1 className="mb-6 text-4xl font-bold tracking-tighter text-white capitalize">{categorySlug}</h1>
        <p className="mb-12 text-xl text-zinc-400">Список услуг в категории {categorySlug}</p>

        {categoryServices.length === 0 ? (
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">В этой категории пока нет услуг</h3>
            <p className="text-zinc-500">Мы работаем над наполнением каталога.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryServices.map((service) => (
              <Link 
                key={service.id}
                to={`/${type}/services/${categorySlug}/${service.slug}`} 
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900"
              >
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                <p className="mb-6 text-sm text-zinc-500 line-clamp-1">
                  {service.description}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="block text-2xl font-bold text-white">{service.price} ₽</span>
                    <span className="text-xs text-zinc-500">за {service.unit}</span>
                  </div>
                  <div className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                    type === 'fiz' 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}>
                    Заказать
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
