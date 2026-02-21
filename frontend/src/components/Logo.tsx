import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 60"
      fill="none"
      className={className}
    >
      {/* Text "Ai.Print" */}
      <text
        x="0"
        y="40"
        fontFamily="Montserrat, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="currentColor"
        letterSpacing="0.5"
      >
        Ai.Print
      </text>
      
      {/* Subtitle "studio" */}
      <text
        x="2"
        y="56"
        fontFamily="Montserrat, sans-serif"
        fontSize="12"
        fill="currentColor"
        opacity="0.7"
        letterSpacing="1"
      >
        studio
      </text>
    </svg>
  );
};
