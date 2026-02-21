import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Service } from '../data/services';

interface OrderFormProps {
  service: Service;
}

export const OrderForm: React.FC<OrderFormProps> = ({ service }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    quantity: 1,
    comment: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Simple validation: max 5 files, max 10MB each
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== newFiles.length) {
        alert('Некоторые файлы слишком большие (макс. 10МБ). Они были пропущены.');
      }
      
      setFiles(prev => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('service_id', service.id);
      data.append('service_name', service.title);
      data.append('service_price', service.price.toString());
      data.append('customer_name', formData.name);
      data.append('phone', formData.phone);
      data.append('telegram_username', formData.telegram);
      data.append('quantity', formData.quantity.toString());
      data.append('comment', formData.comment);

      files.forEach(file => {
        data.append('files', file);
      });

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа');
      }

      setStatus('success');
      setFormData({ name: '', phone: '', telegram: '', quantity: 1, comment: '' });
      setFiles([]);
    } catch (error) {
      console.error('Order error:', error);
      setStatus('error');
      setErrorMessage('Не удалось отправить заказ. Попробуйте позже или напишите нам в Telegram.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-8 text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-emerald-500" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white">Заказ успешно отправлен!</h3>
        <p className="text-zinc-400">
          Менеджер свяжется с вами в ближайшее время для подтверждения деталей.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-emerald-800 text-emerald-400 hover:bg-emerald-950 hover:text-emerald-300"
          onClick={() => setStatus('idle')}
        >
          Оформить еще один заказ
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
      <h3 className="mb-6 text-xl font-bold text-white">Быстрый заказ</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-medium text-zinc-400">Ваше имя</label>
            <input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Иван Иванов"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs font-medium text-zinc-400">Телефон</label>
            <input
              id="phone"
              name="phone"
              required
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="+7 (999) 000-00-00"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="telegram" className="text-xs font-medium text-zinc-400">Telegram (username)</label>
            <input
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="@username"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-xs font-medium text-zinc-400">Количество ({service.unit})</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-400">Файлы (макеты)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 py-6 transition-colors hover:bg-zinc-900"
          >
            <Upload className="mb-2 h-6 w-6 text-zinc-500" />
            <span className="text-xs text-zinc-400">Нажмите для загрузки файлов</span>
            <span className="text-[10px] text-zinc-600 mt-1">Макс. 5 файлов до 10МБ</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
          
          {files.length > 0 && (
            <div className="mt-2 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-md bg-zinc-900 px-3 py-2 text-xs text-zinc-300">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="comment" className="text-xs font-medium text-zinc-400">Комментарий к заказу</label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Уточнения по заказу..."
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 rounded-lg bg-red-950/30 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:bg-zinc-200"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Отправка...
            </>
          ) : (
            'Оформить заказ'
          )}
        </Button>
        
        <p className="text-center text-[10px] text-zinc-600">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </div>
  );
};
