import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  basePath: string; // '/fiz/services' or '/jur/services'
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  slug,
  basePath,
}) => {
  return (
    <Link
      to={`${basePath}/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg hover:shadow-zinc-900/50"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="mb-2 text-xl font-bold text-zinc-100 group-hover:text-white">{title}</h3>
      <p className="mb-6 text-sm text-zinc-400 group-hover:text-zinc-300">{description}</p>
      
      <div className="mt-auto flex items-center text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-300">
        Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
