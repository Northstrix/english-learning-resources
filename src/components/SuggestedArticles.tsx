'use client';

import React, { useState, useEffect } from 'react';
import TourCard from '@/components/TourCard';
import { blogs, BlogArticle } from '@/lib/blog-data';

interface SuggestedArticlesProps {
  currentArticleId: string;
}

export default function SuggestedArticles({ currentArticleId }: SuggestedArticlesProps) {
  const [suggestions, setSuggestions] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const others = blogs.filter(b => b.id !== currentArticleId);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 2));
  }, [currentArticleId]);

  if (suggestions.length === 0) return null;

  return (
    <section className="pt-20 border-t border-white/5 mt-20">
      <header className="mb-12">
        <h2 className="mt-0 mb-0">Suggested articles</h2>
      </header>
      <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-8">
        {suggestions.map((blog) => (
          <TourCard key={blog.id} {...blog} />
        ))}
      </div>
    </section>
  );
}
