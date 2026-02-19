import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const clampInt = (value, min = 1) => {
  const n = parseInt(String(value), 10);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, n);
};

const OrderCard = ({ serviceTitle }) => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const filesCountText = useMemo(() => {
    const n = selectedFiles.length;
    if (n === 0) return "";
    const word =
      n % 10 === 1 && n % 100 !== 11
        ? "файл"
        : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)
        ? "файла"
        : "файлов";
    return `${n} ${word} выбрано`;
  }, [selectedFiles.length]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const handleOrder = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));
      formData.append("quantity", String(quantity));

      if (serviceTitle) {
        formData.append("service", serviceTitle);
      }

      const cleanedComment = comment.trim();
      if (cleanedComment) {
        formData.append("comment", cleanedComment);
      }

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки заказа");
      }

      await response.json();
      navigate("/payment");
    } catch (error) {
      console.error(error);
      alert(
        "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже или свяжитесь с менеджером в Telegram: @aiprintperm"
      );
    }
  };

  return (
    <div className="order-card">
      <h3>Быстрый заказ</h3>
      <p>Укажите количество, добавьте файлы и нажмите «Оформить заказ».</p>

      <div className="order-form">
        {/* Upload button styled as a label. The actual file input is hidden */}
        <label className="file-upload-button">
          <span>Добавить файлы</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {filesCountText && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.85 }}>
            {filesCountText}
          </div>
        )}

        {/* Preview selected files as removable cards */}
        {selectedFiles.length > 0 && (
          <div className="file-preview-list">
            {selectedFiles.map((file, idx) => (
              <div className="file-item" key={`${file.name}-${idx}`}>
                <span className="file-name" title={file.name}>
                  {file.name}
                </span>
                <button
                  type="button"
                  className="remove-file"
                  onClick={() =>
                    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))
                  }
                  aria-label="Удалить файл"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quantity (beautiful control) */}
        <label className="quantity-label">
          Количество:
          <div className="quantity-control">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              aria-label="Уменьшить количество"
            >
              −
            </button>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(clampInt(e.target.value, 1))}
              className="quantity-input"
              aria-label="Количество"
            />

            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
        </label>

        {/* Comment */}
        <label className="comment-label">
          Комментарий:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Например: печать 10×15, на матовой бумаге, без рамки..."
            rows={3}
          />
        </label>
      </div>

      <button className="btn btn-primary order-submit-button" onClick={handleOrder}>
        Оформить заказ
      </button>
    </div>
  );
};

export default OrderCard;
