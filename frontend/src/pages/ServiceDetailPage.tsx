import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FIZ_CATEGORIES, JUR_CATEGORIES } from '../data/services';
import { ArrowLeft, Clock, Banknote, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

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

  const handleContact = () => {
    // Open Telegram or WhatsApp
    const message = `Здравствуйте! Меня интересует услуга "${service.title}" (${type === 'fiz' ? 'Физ. лицо' : 'Юр. лицо'}).`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/your_telegram_username?text=${encodedMessage}`, '_blank');
  };

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
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400">
            {category.title}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {service.title}
          </h1>
          <p className="mb-8 text-lg text-zinc-300 leading-relaxed">
            {service.fullDesc || service.shortDesc}
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-400">
                <Banknote className="h-5 w-5" />
                <span className="font-medium">Стоимость</span>
              </div>
              <div className="text-2xl font-bold text-white">{service.price}</div>
            </div>
            {service.deadline && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-400">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Сроки</span>
                </div>
                <div className="text-2xl font-bold text-white">{service.deadline}</div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button onClick={handleContact} size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Написать менеджеру
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {service.orderSteps && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8">
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
      </div>
    </div>
  );
};
