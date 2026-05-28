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
  const articleData = blogs.find(b => b.id === 'why-english-can-be-tricky-for-german-speakers')!;
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
        <h2>False Friends</h2>
        <p>German and English share many similarities due to their common Germanic roots, which can give learners an initial advantage. However, this closeness also creates traps in the form of <Highlight>False Friends</Highlight> — words that look similar but carry completely different meanings. These misleading terms frequently lead to misunderstandings and awkward errors. For instance, the German word <Highlight>Gift</Highlight> means <Highlight>Posion</Highlight> in English, not <Highlight>Prsent</Highlight>. Similarly, <Highlight>Bekommen</Highlight> means <Highlight>to receive</Highlight> or <Highlight>to get</Highlight> not <Highlight>to become</Highlight>.</p>

        <h2>Articles and Noun Gender</h2>
        <p>German has a complex article system with three grammatical genders — masculine, feminine, and neuter — that influence word endings and agreement. English articles are far simpler, using only <Highlight>a</Highlight>, <Highlight>an</Highlight>, and <Highlight>the</Highlight>, with no gender distinctions. German speakers may overapply gender logic or insert articles where English requires none. Uncountable nouns like <Highlight>Luggage</Highlight>, <Highlight>Equipment</Highlight>, <Highlight>Knowledge</Highlight>, and <Highlight>Progress</Highlight> cause particular trouble, similar to how one can have <Highlight>some milk</Highlight> or <Highlight>a lot of rain</Highlight> but never <Highlight>one milk</Highlight> or <Highlight>a rain</Highlight> as an individual item. Learners often produce forms such as <Highlight>a luggage</Highlight> or <Highlight>an equipment</Highlight> instead of the correct <Highlight>some luggage</Highlight> or <Highlight>a piece of equipment</Highlight>.</p>

        <h2>Word Order and Sentence Structure</h2>
        <p>German sentence structure is more flexible than English, often placing verbs at the end of subordinate clauses or using different positioning for time, manner, and place elements. English follows a stricter subject-verb-object order in most cases. This difference can result in unnatural or confusing constructions when German speakers translate directly. For example, structures that work fine in German may sound awkward or incorrect in English, especially in longer sentences involving multiple clauses. Questions, negation, and adverb placement also follow distinct patterns between the two languages.</p>

        <p>Mastering English word order involves learning complete sentence patterns rather than assembling words individually. This approach reduces interference from German flexibility and leads to clearer, more natural expression over time.</p>

        <h2>Capitalization Differences</h2>
        <p>A very visible difference between the two languages is capitalization. In German, all nouns are capitalized, a rule deeply ingrained for native speakers. In English, only proper nouns, the first word of a sentence, and specific titles receive capital letters. This leads to frequent writing errors where German learners capitalize common nouns unnecessarily, such as capitalizing <Highlight>Dog</Highlight>, <Highlight>Cat</Highlight>, or <Highlight>House</Highlight> in the middle of sentences. Recognizing this contrast and practicing consistent English capitalization conventions helps improve writing accuracy and professionalism.</p>
        
        <h2>Tense Usage</h2>
        <p>English tense usage, particularly the perfect forms, can differ from German in subtle but important ways. German speakers may overuse the simple present where the present perfect is more appropriate, or struggle with the distinction between <Highlight>I went</Highlight> and <Highlight>I have gone</Highlight>. English tenses convey not only time but also aspects of completion, duration, and relevance to the present moment. This requires paying close attention to context and intended meaning rather than relying solely on German tense patterns.</p>

        <p>Regular practice with real-life situations and timelines helps clarify when each tense best expresses the speaker's ideas.</p>
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
