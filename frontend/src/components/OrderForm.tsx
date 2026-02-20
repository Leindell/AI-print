import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface OrderFormProps {
  serviceName: string;
  price: string; // например "500 ₽" или "от 1.8 ₽/шт"
}
console.log("ORDERFORM VERSION: NEW");

function extractPriceNumber(priceText: string): number {
  // Берём первое число из строки (поддержка "1.8", "500", "500 ₽")
  const match = priceText.replace(",", ".").match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export const OrderForm: React.FC<OrderFormProps> = ({ serviceName, price }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    comment: "",
    quantity: 1,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // quantity хранится числом
    if (name === "quantity") {
      const n = Number(value);
      setFormData((prev) => ({ ...prev, quantity: Number.isFinite(n) && n > 0 ? n : 1 }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const unitPrice = extractPriceNumber(price);
      const qty = Number(formData.quantity) || 1;

      // 1) Если есть файлы — грузим их на upload, получаем ссылки
      let uploadedFiles: Array<{ name: string; url: string }> = [];
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("files", f));

        const upRes = await fetch("/api/orders/upload", {
          method: "POST",
          headers: {
            "X-Api-Key": import.meta.env.VITE_SERVER_API_KEY,
          },
          body: fd,
        });

        if (!upRes.ok) {
          const txt = await upRes.text().catch(() => "");
          throw new Error(txt || `Upload failed (HTTP ${upRes.status})`);
        }

        const upJson = await upRes.json().catch(() => ({} as any));
        uploadedFiles = Array.isArray(upJson.files) ? upJson.files : [];
      }

      // 2) Собираем JSON заказ
      const payload = {
        service: serviceName,
        unit_price: unitPrice,
        qty,
        total_price: unitPrice * qty,

        client_name: formData.name,
        client_username: (formData.telegram || "").replace(/^@/, "") || undefined,
        telegram_user_id: 0,

        size: "—",
        comment: formData.comment || null,
        created_at: new Date().toISOString(),
        files: uploadedFiles,
      };

      // 3) Отправляем заказ
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": import.meta.env.VITE_SERVER_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Order submit failed (HTTP ${res.status})`);
      }

      setStatus("success");
    } catch (error) {
      console.error("Order submission error:", error);
      setStatus("error");
      setErrorMessage(
        "Произошла ошибка при отправке. Пожалуйста, попробуйте позже или напишите нам в Telegram."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white">Заявка отправлена!</h3>
        <p className="mb-6 text-zinc-300">Менеджер свяжется с вами в ближайшее время для подтверждения заказа.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => window.open("https://t.me/Aiprinttbot", "_blank")} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Открыть Telegram
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStatus("idle");
              setFormData({ name: "", phone: "", telegram: "", comment: "", quantity: 1 });
              setFiles([]);
            }}
          >
            Создать ещё заказ
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
      <h3 className="mb-6 text-xl font-bold text-white">Быстрый заказ</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Ваше имя *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Иван Иванов"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Телефон *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="+7 (999) 000-00-00"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">Telegram (username)</label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-zinc-500">@</span>
            <input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 pl-8 pr-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="username"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Количество</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Файлы (макеты)</label>
            <div className="relative">
              <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
              <label
                htmlFor="file-upload"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-600 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Upload className="h-4 w-4" />
                {files.length > 0 ? `${files.length} файл(ов)` : "Загрузить файлы"}
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-400">Комментарий к заказу</label>
          <textarea
            name="comment"
            rows={3}
            value={formData.comment}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Укажите пожелания по бумаге, срокам и т.д."
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={status === "loading"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/20"
        >
          Оформить заказ
        </Button>

        <p className="text-center text-xs text-zinc-500">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </div>
  );
};