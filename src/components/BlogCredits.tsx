'use client';

import React from 'react';

interface BlogCreditsProps {
  markdown: string;
}

export default function BlogCredits({ markdown }: BlogCreditsProps) {
  if (!markdown) return null;

  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  
  const linkClass = "text-white underline decoration-white transition-all duration-300 ease-in-out hover:text-primary hover:decoration-primary";

  return (
    <div className="pt-20 border-t border-white/5 mt-20 text-left">
      <header className="mb-6">
        <h2 className="mt-0 mb-0">Credits</h2>
      </header>
      <div className="flex flex-col gap-3">
        {lines.map((line, lineIdx) => {
          const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match: RegExpExecArray | null;
          let key = 0;

          while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(
                <span key={key++}>
                  {line.slice(lastIndex, match.index)}
                </span>
              );
            }

            parts.push(
              <a
                key={key++}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {match[1]}
              </a>
            );
            lastIndex = regex.lastIndex;
          }

          if (lastIndex < line.length) {
            parts.push(
              <span key={key++}>
                {line.slice(lastIndex)}
              </span>
            );
          }

          return (
            <p key={lineIdx} className="text-[12px] font-mono m-0 leading-relaxed text-[#aaaaaa]">
              {parts}
            </p>
          );
        })}
      </div>
    </div>
  );
}