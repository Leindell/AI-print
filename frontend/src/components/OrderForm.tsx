import React, { useMemo, useRef, useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Service } from '../data/services';

interface OrderFormProps {
  service: Service;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const OrderForm: React.FC<OrderFormProps> = ({ service }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    quantity: 1,
    comment: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [orderId, setOrderId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; files?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPrice = useMemo(() => {
    const qty = Number(formData.quantity) || 1;
    const price = Number(service.price) || 0;
    return Math.round(qty * price);
  }, [formData.quantity, service.price]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
    setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    setErrorMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    // max 10 files, max 10MB each
    const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);

    if (validFiles.length !== newFiles.length) {
      alert('Некоторые файлы слишком большие (макс. 10МБ). Они были пропущены.');
    }

    const merged = [...files, ...validFiles].slice(0, 10);

    if (merged.length === 10 && (files.length + validFiles.length) > 10) {
      setFieldErrors(prev => ({ ...prev, files: 'Можно прикрепить максимум 10 файлов.' }));
    } else {
      setFieldErrors(prev => ({ ...prev, files: undefined }));
    }

    setFiles(merged);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFieldErrors(prev => ({ ...prev, files: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const data = new FormData();
      data.append('service_id', String(service.id));
      data.append('service_name', service.title);
      data.append('service_price', String(service.price));
      data.append('customer_name', formData.name);
      data.append('phone', formData.phone);
      data.append('telegram_username', formData.telegram);
      data.append('quantity', String(formData.quantity));
      data.append('comment', formData.comment);

      files.forEach(file => data.append('files', file));

      const response = await fetch('/api/orders', { method: 'POST', body: data });
      const payload = await response.json().catch(() => ({} as any));

      if (!response.ok) {
        const msg = payload?.message || 'Ошибка при отправке заказа';
        const field = payload?.field as 'phone' | 'files' | undefined;

        if (field) {
          setFieldErrors(prev => ({ ...prev, [field]: msg }));
        } else {
          setErrorMessage(msg);
        }

        setStatus('error');
        return;
      }

      setOrderId(String(payload?.orderId || ''));
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
        {orderId && (
          <p className="mb-2 text-sm text-emerald-300">
            Номер заказа: <span className="font-semibold">#{orderId}</span>
          </p>
        )}
        <p className="text-zinc-400">Менеджер свяжется с вами для подтверждения деталей.</p>

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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Быстрый заказ</h3>
          <p className="mt-1 text-xs text-zinc-400">
            {service.title} • {service.price} ₽/{service.unit} • Итого: {totalPrice} ₽
          </p>
        </div>
      </div>

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
            {fieldErrors.phone && <div className="text-xs text-red-400">{fieldErrors.phone}</div>}
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
            <span className="mt-1 text-[10px] text-zinc-600">Макс. 10 файлов до 10МБ</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />

          {fieldErrors.files && <div className="text-xs text-red-400">{fieldErrors.files}</div>}

          {files.length > 0 && (
            <div className="mt-2 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-md bg-zinc-900 px-3 py-2 text-xs text-zinc-300">
                  <span className="max-w-[240px] truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(index)} className="text-zinc-500 hover:text-red-400">
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
            <span>{errorMessage || 'Не удалось отправить заказ.'}</span>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Отправка...
            </span>
          ) : (
            'Отправить заказ'
          )}
        </Button>
      </form>
    </div>
  );
};