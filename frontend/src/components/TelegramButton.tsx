import React from 'react';
import { Button } from './ui/Button';
import { Send } from 'lucide-react';

interface TelegramButtonProps {
  serviceSlug?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const TelegramButton: React.FC<TelegramButtonProps> = ({ 
  serviceSlug, 
  quantity = 1,
  className = '',
  children = 'Заказать в Telegram',
  variant = 'primary',
  size = 'md'
}) => {
  const handleClick = () => {
    let url = 'https://t.me/Aiprinttbot';
    if (serviceSlug) {
      // Add start payload if service is provided
      // Format: start=service_slug-quantity (simple encoding)
      url += `?start=${serviceSlug}-${quantity}`;
    }
    window.open(url, '_blank');
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant} 
      size={size} 
      className={`gap-2 ${className}`}
    >
      <Send className="h-4 w-4" />
      {children}
    </Button>
  );
};
