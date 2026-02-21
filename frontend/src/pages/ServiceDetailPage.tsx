import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FIZ_CATEGORIES, JUR_CATEGORIES } from '../data/services';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ServiceDetailPageProps {
  type: 'fiz' | 'jur';
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ type }) => {
  const { categorySlug, serviceSlug } = useParams<{ categorySlug: string; serviceSlug: string }>();
  const categories = type === 'fiz' ? FIZ_CATEGORIES : JUR_CATEGORIES;
  const category = categories.find((c) => c.slug === categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);

  if (!service || !category) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Услуга не найдена</h1>
        <Link to={`/${type}`} className="text-zinc-400 hover:text-white">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleOrderClick = () => {
    // Open Telegram bot link
    // Replace 'YourBotName' with actual bot username if known, or just a placeholder
    const botUsername = "AIPrintBot"; // Placeholder
    window.open(`https://t.me/${botUsername}?start=order_${service.id}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to={`/${type}/services/${categorySlug}`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к категории
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column: Info */}
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-bold text-white">{service.title}</h1>
            <p className="text-lg text-zinc-400">{service.fullDesc || service.shortDesc}</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-300 border border-zinc-800">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>Срок: {service.deadline || 'По запросу'}</span>
            </div>
            {service.minQty && (
              <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-300 border border-zinc-800">
                <AlertCircle className="h-4 w-4 text-emerald-400" />
                <span>Мин. заказ: {service.minQty}</span>
              </div>
            )}
          </div>

          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-sm text-zinc-400">Стоимость</span>
              <span className="text-2xl font-bold text-white">{service.price}</span>
            </div>
            <Button onClick={handleOrderClick} className="w-full bg-white text-black hover:bg-zinc-200" size="lg">
              Заказать через Telegram
            </Button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Откроется чат с ботом для быстрого оформления
            </p>
          </div>

          {service.orderSteps && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-white">Как заказать</h3>
              <div className="space-y-4">
                {service.orderSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-zinc-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Details/Image placeholder */}
        <div className="space-y-6">
          {service.details && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Детали</h3>
              <ul className="space-y-2">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Placeholder for service image */}
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
             <span className="text-zinc-600">Изображение услуги</span>
          </div>
        </div>
      </div>
    </div>
  );
};
