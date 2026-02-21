import React from 'react';
import { Phone, Mail, Send, MapPin } from 'lucide-react';
import { TG_MANAGER, TG_MANAGER_USERNAME } from '../config/links';

export const Contact: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-black">
      <div className="container mx-auto flex flex-1 flex-col px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Контакты</h1>
          <p className="text-zinc-500">Мы всегда на связи и готовы ответить на ваши вопросы</p>
        </div>

        <div className="grid flex-1 gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8">
              <h2 className="mb-8 text-xl font-bold text-white">Свяжитесь с нами</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Телефон</p>
                    <a href="tel:+79958583035" className="text-lg font-medium text-white hover:text-indigo-400 transition-colors">
                      +7 (995) 858-30-35
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Email</p>
                    <a href="mailto:zalogosfera@bk.ru" className="text-lg font-medium text-white hover:text-indigo-400 transition-colors">
                      zalogosfera@bk.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Telegram</p>
                    <a href={TG_MANAGER} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-indigo-400 transition-colors">
                      {TG_MANAGER_USERNAME}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-2 text-lg font-bold text-white">Адрес офиса</h2>
                  <address className="not-italic text-zinc-400">
                    <p>г. Пермь, Переселенческая улица, 100</p>
                    <p className="text-sm text-zinc-500 mt-1">Подъезд 1, Офис 1, Домофон 100</p>
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=56.179156%2C57.996158&z=17&pt=56.179156%2C57.996158,pm2rdm"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen 
              className="absolute inset-0"
            />
            <a 
              href="https://yandex.com/maps/org/ai_print/155702326859/prices/?ll=56.179156%2C57.996158&z=17"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-2 text-xs text-black shadow-lg backdrop-blur-sm hover:bg-white transition-colors"
            >
              <span className="text-red-500 mr-2">●</span> Открыть в Яндекс Картах
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
