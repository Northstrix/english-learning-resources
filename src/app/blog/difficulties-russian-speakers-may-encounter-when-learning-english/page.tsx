'use client';

import React, { useState, useEffect } from 'react';
import Highlight from '@/components/Highlight';
import BlogCredits from '@/components/BlogCredits';
import DraggableFlashCard from '@/components/DraggableFlashCard';
import RefinedChronicleButton from '@/components/RefinedChronicleButton';
import SuggestedArticles from '@/components/SuggestedArticles';
import { blogs } from '@/lib/blog-data';
import { RotateCcw } from 'lucide-react';

export default function BlogPage() {
  const articleData = blogs.find(b => b.id === 'difficulties-russian-speakers-may-encounter-when-learning-english')!;
  const [resetKey, setResetKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <article className="max-w-4xl mx-auto">
      <header className="text-left">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#aaaaaa] mb-6 flex items-center gap-3">
          <span className="text-primary font-bold">{articleData.category}</span>
          <span className="opacity-30">|</span>
          <span>{articleData.date}</span>
          <span className="opacity-30">|</span>
          <span>{articleData.readTime}</span>
        </div>
        <h1>
          {articleData.title}
        </h1>
      </header>

      <section className="text-left">
        <p>Learning English presents a unique set of challenges for Russian speakers due to fundamental structural differences between Slavic and Germanic languages. Because Russian is a highly inflected language that uses grammatical case endings to show relationships between words, learners often struggle with English's strict, fixed word order. Additionally, Russian completely lacks an article system (a/an/the), lacks a present-tense form of the verb "to be" in simple sentences, and features a vastly different phonetic system, leading to predictable hurdles in grammar, syntax, and pronunciation.</p>
        
        <h2>Two Maslos</h2>
        <p>A frequent difficulty lies in vocabulary. Many Russian words cover concepts that English splits into several specific terms. For example, the Russian word <Highlight>Maslo</Highlight> covers both <Highlight>Butter</Highlight> and various types of <Highlight>Oil</Highlight>. In English, <Highlight>Butter</Highlight> specifically denotes a solid dairy fat churned from milk cream, whereas <Highlight>Oil</Highlight> refers exclusively to liquid fats pressed from plants or seeds, as well as synthetic or petroleum-based liquids like motor oil. This difference means Russian speakers sometimes say butter when they mean oil, or vice versa, leading to confusion in everyday situations.</p>

        <h2>Pronunciation Challenges</h2>
        <p>English contains several sounds that are absent in Russian. Most notably, the <Highlight>th</Highlight> sounds in words like <Highlight>Think</Highlight> and <Highlight>This</Highlight> are commonly substituted with <Highlight>s</Highlight>, <Highlight>z</Highlight>, or <Highlight>t</Highlight>. Additionally, the r-colored vowel sound written as <Highlight>ea</Highlight> in <Highlight>Earth</Highlight> and <Highlight>e</Highlight> in <Highlight>Her</Highlight> often gets replaced with a flat vowel.</p>

        <h2>Articles</h2>
        <p>Russian has no articles, making <Highlight>a</Highlight>, <Highlight>an</Highlight>, and <Highlight>the</Highlight> one of the biggest hurdles for learners. Without direct equivalents in their native language, Russian speakers often omit articles entirely or use them incorrectly in sentences. Mastering when to use definite versus indefinite articles takes consistent exposure and practice over time.</p>

        <h2>Verb Tenses</h2>
        <p>English has a much more complex tense system than Russian, especially regarding the continuous and perfect aspects that lack direct grammatical equivalents. This structural gap often leads to persistent mistakes, such as resorting to the <Highlight>Past Simple</Highlight> tense where the <Highlight>Present Perfect</Highlight> is required to connect a past event to the present. Russian speakers also struggle with complex aspectual constructions like the <Highlight>Present Perfect Continuous</Highlight> (<Highlight>have been doing</Highlight>) and the <Highlight>Past Perfect</Highlight> (<Highlight>had done</Highlight>), often confusing them with simple past actions. Because Russian relies on perfective and imperfective verb aspects rather than a large matrix of tenses, choosing the correct English form remains a significant hurdle even for advanced learners.</p>

        <h2>Word Order and Prepositions</h2>
        <p>Russian permits highly flexible word order due to its notoriously complex case system, but English demands a strict subject-verb-object structure. When Russian speakers translate directly, this rigid syntax often results in awkward or grammatically incorrect sentence structures. Prepositions present a similarly difficult challenge. For instance, learners frequently say <Highlight>depend from</Highlight> instead of the correct <Highlight>depend on</Highlight>, or consistently misapply other common prepositions because the two languages express spatial and logical relationships in entirely different ways.</p>
      </section>

      {articleData.flashcards && isMounted && (
        <section className="border-t border-white/5 mt-14 relative">
        <h2>Flashcards</h2>
        <p>Click the "Reveal" button to see the word corresponding to the image, and feel free to drag the cards around if you want.</p>

          <header className="mb-12 flex items-center">
            <RefinedChronicleButton 
              onClick={handleReset}
              backgroundColor="rgba(255, 255, 255, 0.05)"
              textColor="#fff"
              borderColor="rgba(255, 255, 255, 0.1)"
              borderVisible={true}
              hoverBackgroundColor="hsl(var(--primary))"
            >
              <RotateCcw className="w-4 h-4" /> Reset Positions
            </RefinedChronicleButton>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative" key={resetKey}>
            {articleData.flashcards.map((card) => (
              <div 
                key={card.word} 
                className="relative aspect-[217/241] w-full max-w-[412px] md:max-w-none mx-auto md:mx-0"
              >
                <DraggableFlashCard 
                  word={card.word}
                  definition={card.definition}
                  imageUrl={card.imageUrl}
                  initialX={0}
                  initialY={0}
                  className="!relative !inset-0"
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <BlogCredits markdown={articleData.credits} />
      <SuggestedArticles currentArticleId={articleData.id} />
    </article>
  );
}
