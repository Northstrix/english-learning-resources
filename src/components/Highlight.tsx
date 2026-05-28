'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HighlightProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const Highlight = ({ children, href, className }: HighlightProps) => {
  const Tag = href ? 'a' : 'span';
  
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "relative inline-block transition-colors duration-300 no-underline group text-white leading-none",
        href ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      <span className="relative z-10 px-0">
        {children}
      </span>
      <span 
        className="absolute inset-0 bg-primary z-0 transition-all duration-300 group-hover:animate-[link_1s_ease_1] origin-right"
        style={{ transformOrigin: 'right', height: '1.2em', top: '-0.1em' }}
      />
    </Tag>
  );
};

export default Highlight;