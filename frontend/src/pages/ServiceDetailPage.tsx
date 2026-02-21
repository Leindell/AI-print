import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Timer, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { services } from '../data/services';
import { OrderForm } from '../components/OrderForm';
import { TG_MANAGER } from '../config/links';

interface ServiceDetailPageProps {
  type: 'fiz' | 'jur';
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ type }) => {
  const { categorySlug, serviceSlug } = useParams();
  
  const service = services.find(s => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="min-h-screen bg-black py-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Услуга не найдена</h2>
          <Link to={`/${type}`} className="text-indigo-400 hover:text-indigo-300">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <Link 
          to={`/${type}/services/${categorySlug}`} 
          className="mb-8 inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Назад к категории
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Details */}
          <div>
            <h1 className="mb-4 text-4xl font-bold text-white capitalize">{service.title}</h1>
            <p className="mb-8 text-lg text-zinc-400">
              {service.description}
            </p>

            <div className="mb-8 flex gap-4">
              <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-300">
                <Clock className="mr-2 h-3 w-3 text-zinc-500" /> Срок: от 15 мин
              </div>
              <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-300">
                <Timer className="mr-2 h-3 w-3 text-emerald-500" /> Мин. заказ: 1 {service.unit}
              </div>
            </div>

            <div className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-end justify-between">
                <span className="text-sm text-zinc-500">Стоимость</span>
                <span className="text-2xl font-bold text-white">{service.price} ₽ / {service.unit}</span>
              </div>
            </div>
            
            <div className="mb-8">
               <a 
                href={TG_MANAGER}
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center rounded-xl py-4 text-sm font-bold text-white transition-colors ${
                  type === 'fiz'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Send className="mr-2 h-4 w-4" /> Заказать через Telegram
              </a>
              <p className="mt-4 text-center text-xs text-zinc-600">
                Откроется чат с ботом для быстрого оформления
              </p>
            </div>
          </div>

          {/* Right Column: Order Form */}
          <div>
            <OrderForm service={service} />
          </div>
        </div>
      </div>
    </div>
  );
};
