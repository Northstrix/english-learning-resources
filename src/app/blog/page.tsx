'use client';

import React from 'react';
import TourCard from '@/components/TourCard';
import { blogs } from '@/lib/blog-data';

export default function BlogListPage() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-6">
      <header className="border-b border-white/10 pb-12">
        <h1 className="text-4xl md:text-7xl text-white font-black leading-none tracking-tighter">
          Blog
        </h1>
      </header>

      <section className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-8 pt-12">
        {blogs.map((blog) => (
          <TourCard key={blog.id} {...blog} />
        ))}
      </section>
    </div>
  );
}
