import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black font-sans">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Контакты</h1>
          <p className="text-xl text-zinc-400">
            Мы всегда на связи и готовы ответить на ваши вопросы
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 transition-colors hover:bg-zinc-900/50">
              <h3 className="mb-6 text-2xl font-bold text-white">Свяжитесь с нами</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-zinc-800 p-3 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-400">Телефон</p>
                    <a href="tel:+79958583035" className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors">
                      +7 (995) 858-30-35
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-zinc-800 p-3 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-400">Email</p>
                    <a href="mailto:zalogosfera@bk.ru" className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors">
                      zalogosfera@bk.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-zinc-800 p-3 text-white">
                    <Send className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-400">Telegram</p>
                    <a href="https://t.me/AIPrintBot" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors">
                      @AIPrintBot
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 transition-colors hover:bg-zinc-900/50">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-zinc-800 p-3 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">Адрес офиса</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Perm, Pereselencheskaya St., 100<br />
                    <span className="text-zinc-500 text-sm">Entrance 1, Office 1, Intercom 100</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="h-full min-h-[400px] w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?text=Пермь+улица+Переселенческая+100" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true} 
              style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg)' }}
              title="Yandex Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
