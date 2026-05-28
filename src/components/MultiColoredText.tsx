'use client';

import React from 'react';

interface MultiColoredTextProps {
  inscription: string;
  fontSize: string;
  colors: string[];
  separatorRotation: string;
  fontWeight: number;
}

export const MultiColoredTextV1 = ({
  inscription,
  fontSize,
  colors,
  separatorRotation,
  fontWeight,
}: MultiColoredTextProps) => {
  const gradient = `linear-gradient(${separatorRotation}, ${colors.join(', ')})`;

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center',
        lineHeight: 1,
        fontFamily: 'var(--font-headline)',
        letterSpacing: '-0.05em',
      }}
      className="select-none"
    >
      {inscription}
    </div>
  );
};