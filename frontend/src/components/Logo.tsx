import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Triangle Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square"
      >
        <path 
          d="M50 15 L85 85 H15 L50 15Z" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-lg tracking-wide">Ai</span>
        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase opacity-80">Print</span>
      </div>
    </div>
  );
};
