import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src="/logo.png"
      alt="Ai.Print Studio"
      className={className ?? "h-10 w-auto object-contain block"}
      draggable={false}
    />
  );
};