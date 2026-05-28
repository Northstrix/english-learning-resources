"use client";

import React, { useState } from "react";
import Link from "next/link";
import NamerUiBadge from "./NamerUiBadge";
import CreditModal from "./CreditModal";

export default function Footer() {
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  const linkClass =
    "text-white underline decoration-white/80 underline-offset-4 transition-colors duration-300 ease-in-out hover:text-[hsl(var(--primary))] hover:decoration-[hsl(var(--primary))]";

  return (
    <footer className="border-t border-white/5 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-center text-center gap-4 font-mono text-xs md:items-start md:text-left">
            <span className="block w-full text-[10px] opacity-40 md:text-left">
              <span className="md:hidden">Navigation</span>
              <span className="hidden md:inline">App</span>
            </span>

            <ul className="m-0 flex list-none flex-col items-center space-y-2 p-0 md:items-start">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className={linkClass}>
                  Resources
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsCreditModalOpen(true)}
                  className={linkClass}
                >
                  Credit
                </button>
              </li>
            </ul>
            <div className="hidden md:flex flex-col gap-[7px] font-mono tracking-widest text-[hsl(var(--muted))] text-[12px] leading-tight">
              <div className="h-4"/>
              <span>
                Made by{" "}
                <a
                  href="https://maxim-bortnikov.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Maxim Bortnikov
                </a>
              </span>
              <span>
                using{" "}
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Next.js
                </a>
                ,{" "}
                <a
                  href="https://www.perplexity.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Perplexity
                </a>
                ,
              </span>
              <span>
                and{" "}
                <a
                  href="https://firebase.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Firebase Studio
                </a>
                .
              </span>
              <div className="mb-16"/>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4 font-mono text-xs md:items-center md:text-center">
            <span className="block w-full text-[10px] opacity-40 md:text-center">
              <span>Social</span>
            </span>

            <ul className="m-0 flex list-none flex-col items-center space-y-2 p-0">
              <li>
                <a
                  href="https://x.com/maxim_bortnikov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 no-underline"
                >
                  <span className={linkClass}>X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Northstrix/english-learning-resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 no-underline"
                >
                  <span className={linkClass}>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center gap-4 font-mono text-xs md:items-end md:text-right">
            <span className="block w-full text-[10px] opacity-40 md:text-right">
              <span className="md:hidden">About</span>
              <span className="hidden md:inline">Additional Info</span>
            </span>

            <div className="flex w-full flex-col gap-6 items-center md:items-end">
              <div className="w-fit md:ml-auto">
                <NamerUiBadge
                  poweredByText="Powered by"
                  namerUIName="Namer UI"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-14 flex flex-col gap-[7px] font-mono tracking-widest text-[hsl(var(--muted))] text-[12px] leading-tight items-center text-center md:hidden">
          <span>
            Made by{" "}
            <a
              href="https://maxim-bortnikov.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Maxim Bortnikov
            </a>
          </span>
          <span>
            using{" "}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://www.perplexity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Perplexity
            </a>
            ,
          </span>
          <span>
            and{" "}
            <a
              href="https://firebase.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Firebase Studio
            </a>
            .
          </span>
        </div>
      </div>

      <CreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
      />
    </footer>
  );
}