import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tighter text-white">О студии</h1>
        
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-lg text-zinc-400">
            <p>
              Мы — команда профессионалов, любящих свое дело. <span className="text-white font-medium">Ai.Print Studio</span> предоставляет полный спектр полиграфических услуг, от печати фотографий до создания сложной сувенирной продукции.
            </p>
            <p>
              Наше оборудование позволяет выполнять заказы любой сложности в кратчайшие сроки. Мы работаем как с частными клиентами, так и с крупным бизнесом, обеспечивая индивидуальный подход к каждому заказу.
            </p>
            <p>
              Используем современные технологии и качественные материалы, чтобы результат превзошел ваши ожидания.
            </p>
          </div>
          
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
             <img 
               src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop" 
               alt="Интерьер студии Ai.Print" 
               className="absolute inset-0 h-full w-full object-cover"
             />
          </div>
        </div>
      </div>
    </div>
  );
};
