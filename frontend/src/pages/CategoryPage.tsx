import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FIZ_CATEGORIES, JUR_CATEGORIES, Category } from '../data/services';
import { ArrowLeft, ArrowRight, Clock, Banknote } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

interface CategoryPageProps {
  type: 'fiz' | 'jur';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ type }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  const categories = type === 'fiz' ? FIZ_CATEGORIES : JUR_CATEGORIES;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Категория не найдена</h2>
        <Button onClick={() => navigate(`/${type}`)} variant="secondary">
          Вернуться на главную
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        onClick={() => navigate(`/${type}`)}
        className="mb-8 pl-0 hover:bg-transparent hover:text-zinc-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к категориям
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-100">
            <category.icon className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {category.title}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-zinc-400">{category.description}</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.services.map((service) => (
          <Link
            key={service.id}
            to={`/${type}/services/${category.slug}/${service.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg"
          >
            <div className="mb-4 flex-1">
              <h3 className="mb-2 text-xl font-bold text-zinc-100 group-hover:text-white">
                {service.title}
              </h3>
              {service.shortDesc && (
                <p className="mb-4 text-sm text-zinc-400 group-hover:text-zinc-300">
                  {service.shortDesc}
                </p>
              )}
              
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  <span>{service.price}</span>
                </div>
                {service.deadline && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{service.deadline}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center text-sm font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">
              Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
