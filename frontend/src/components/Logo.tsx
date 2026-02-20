import React from 'react';
import { motion } from 'motion/react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AI Print Studio Logo"
    >
      {/* Triangle A shape */}
      <path 
        d="M30 10 L50 50 L10 50 Z" 
        fill="white" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      {/* Text "AI" */}
      <text x="60" y="45" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="white">AI</text>
      {/* Text "Print Studio" */}
      <text x="110" y="45" fontFamily="Arial, sans-serif" fontWeight="normal" fontSize="24" fill="white">Print</text>
    </svg>
  );
};
