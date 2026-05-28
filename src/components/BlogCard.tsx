
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
}

export default function BlogCard({ id, title, category, description, imageSrc }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`} className="block h-full">
      <motion.div 
        className="group bg-[#0a0a0a] border border-[#1e1e1e] flex flex-col h-full relative overflow-hidden"
        initial="initial"
        whileHover="animate"
      >
        <div className="px-5 py-6 flex flex-col gap-6">
          <div className="relative w-full aspect-[4.2/3.5] overflow-hidden border border-[#1e1e1e]">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="font-headline">
              <h3 className="text-2xl md:text-3xl tracking-tighter leading-none relative z-10 text-white font-black">
                <span className="relative inline-block">
                  <span className="relative z-10 px-1">{title}</span>
                  <span className="absolute inset-y-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
                </span>
              </h3>
              <span className="tracking-widest opacity-40 block mt-2 text-xs font-mono uppercase">
                {category}
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-60 text-white">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-auto px-6 py-4 flex items-center justify-between bg-[#111] border-t border-[#1e1e1e]">
          <span className="font-black font-mono text-xs uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
            Read Resources
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65827 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65827 12.8536 7.85355L8.85355 11.8536C8.65827 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65827 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
