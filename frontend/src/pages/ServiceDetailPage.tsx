import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FIZ_CATEGORIES, JUR_CATEGORIES } from '../data/services';
import { ArrowLeft, Clock, Banknote, CheckCircle, MessageCircle, Package, Timer } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { OrderForm } from '../components/OrderForm';
import { TelegramButton } from '../components/TelegramButton';

interface ServiceDetailPageProps {
  type: 'fiz' | 'jur';
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ type }) => {
  const { categorySlug, serviceSlug } = useParams<{ categorySlug: string; serviceSlug: string }>();
  const navigate = useNavigate();

  const categories = type === 'fiz' ? FIZ_CATEGORIES : JUR_CATEGORIES;
  const category = categories.find((c) => c.slug === categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);

  if (!service || !category) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Услуга не найдена</h2>
        <Button onClick={() => navigate(`/${type}`)} variant="secondary">
          Вернуться в каталог
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        onClick={() => navigate(`/${type}/services/${categorySlug}`)}
        className="mb-8 pl-0 hover:bg-transparent hover:text-zinc-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к категории
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400">
              {category.title}
            </div>
            {service.tags && service.tags.map(tag => (
              <div key={tag} className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 border border-indigo-500/20">
                {tag}
              </div>
            ))}
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {service.title}
          </h1>
          <p className="mb-8 text-lg text-zinc-300 leading-relaxed">
            {service.fullDesc || service.shortDesc}
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:bg-zinc-900/50">
              <div className="mb-2 flex items-center gap-2 text-zinc-400">
                <Banknote className="h-5 w-5" />
                <span className="font-medium">Стоимость</span>
              </div>
              <div className="text-2xl font-bold text-white">{service.price}</div>
            </div>
            {service.deadline && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:bg-zinc-900/50">
                <div className="mb-2 flex items-center gap-2 text-zinc-400">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Сроки</span>
                </div>
                <div className="text-2xl font-bold text-white">{service.deadline}</div>
              </div>
            )}
            {service.minQty && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:bg-zinc-900/50">
                <div className="mb-2 flex items-center gap-2 text-zinc-400">
                  <Package className="h-5 w-5" />
                  <span className="font-medium">Мин. заказ</span>
                </div>
                <div className="text-xl font-bold text-white">{service.minQty}</div>
              </div>
            )}
          </div>

          <div className="mb-8">
             <TelegramButton 
               serviceSlug={service.slug} 
               className="w-full sm:w-auto bg-[#2AABEE] hover:bg-[#229ED9] text-white shadow-lg shadow-blue-500/20"
               size="lg"
             >
               Заказать через Telegram
             </TelegramButton>
             <p className="mt-2 text-xs text-zinc-500">
               Откроется чат с ботом для быстрого оформления
             </p>
          </div>

          {service.orderSteps && (
            <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Как заказать</h3>
              <div className="space-y-6">
                {service.orderSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-bold text-white ring-1 ring-zinc-700">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-zinc-300">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.details && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Детали</h3>
              <ul className="space-y-3">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Order Form Component */}
          <OrderForm serviceName={service.title} price={service.price} />
        </motion.div>
      </div>
    </div>
  );
};
