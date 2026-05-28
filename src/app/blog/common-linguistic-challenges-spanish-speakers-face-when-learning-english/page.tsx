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
  const articleData = blogs.find(b => b.id === 'common-linguistic-challenges-spanish-speakers-face-when-learning-english')!;
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
        <p>Although Spanish and English share some vocabulary due to Latin influence, they differ significantly in grammar, pronunciation, and usage. These differences often lead to predictable errors among Spanish-speaking learners that require consistent focus to overcome.</p>

        <h2>Vocabulary and False Friends</h2>
        <p>Spanish and English share many cognates due to their common Latin influences, which can initially make learning feel easier. Yet this similarity creates hidden traps known as false friends — words that appear similar but have entirely different meanings. These misleading terms often lead to embarrassing or confusing mistakes. For example, the Spanish word <Highlight>Embarazada</Highlight> means <Highlight>Pregnant</Highlight>, not <Highlight>Embarrassed</Highlight>. Likewise, <Highlight>Carpeta</Highlight> means <Highlight>Folder</Highlight> or <Highlight>File</Highlight>, not <Highlight>Carpet</Highlight> while <Highlight>Realizar</Highlight> means <Highlight>to carry out</Highlight> rather than <Highlight>to realize</Highlight>. Recognizing and memorizing these differences prevents direct translation errors and improves both speaking and writing accuracy over time.</p>

        <h2>Verb System and “To Be”</h2>
        <p>Spanish uses two distinct verbs for <Highlight>to be</Highlight> — <Highlight>Ser</Highlight> and <Highlight>Estar</Highlight> — allowing speakers to clearly separate permanent characteristics from temporary states or locations. English, however, relies on a single verb <Highlight>to be</Highlight>, which can feel limiting. This difference leads Spanish speakers to struggle with expressing nuances correctly, such as distinguishing between inherent qualities and current conditions.</p>

        <h2>Articles and Countability</h2>
        <p>While both languages use articles, the rules governing them differ significantly. Spanish speakers frequently encounter problems with English uncountable nouns, which can't be treated as individual items. Words like <Highlight>luggage</Highlight>, <Highlight>evidence</Highlight>, <Highlight>scenery</Highlight>, <Highlight>progress</Highlight>, and <Highlight>fun</Highlight> fall into this category. Just as you can have <Highlight>some milk</Highlight> or <Highlight>a lot of rain</Highlight> but never <Highlight>one milk</Highlight> or <Highlight>a rain</Highlight> as a single piece, these nouns follow the same pattern. Common mistakes include saying <Highlight>a luggage</Highlight> or <Highlight>an evidence</Highlight> instead of the correct <Highlight>some luggage</Highlight> or <Highlight>a piece of evidence</Highlight>.</p>

        <p>Additional challenges arise in general statements where articles may be omitted or added based on Spanish habits. Exposure to complete sentences in natural contexts is one of the most effective ways to develop an intuitive feel for English article usage.</p>

        <h2>Pronunciation and Sounds</h2>
        <p>English contains several distinct sounds and phonological structures that don't exist in Spanish, creating complex pronunciation hurdles for learners. A major structural challenge is the <Highlight>initial s-cluster</Highlight>; because Spanish words never begin with an "s" followed by a consonant without a preceding vowel, learners routinely add a prosthetic "e" sound to words, pronouncing <Highlight>State</Highlight> as <Highlight>Estate</Highlight> or <Highlight>School</Highlight> as <Highlight>Eschool</Highlight>. Additionally, Spanish lacks the English phoneme <Highlight>/z/</Highlight>, leading speakers to substitute the unvoiced <Highlight>/s/</Highlight> sound in words like <Highlight>Buzz</Highlight> or <Highlight>Easy</Highlight>. The two distinct <Highlight>th</Highlight> sounds—the unvoiced fricative in <Highlight>three</Highlight> and the voiced dental fricative in <Highlight>the</Highlight>—pose another severe challenge, as Spanish speakers often drop or harden them into <Highlight>t</Highlight> or <Highlight>d</Highlight> sounds. Final consonants also cause friction; Spanish words rarely end in complex consonants like <Highlight>-ng</Highlight> or <Highlight>-d</Highlight>, causing learners to either omit the final sound or morph <Highlight>Wing</Highlight> into a soft <Highlight>Win</Highlight>. Rhythm presents a final, structural contrast: English is stress-timed, while Spanish is syllable-timed, which can make spoken English from Spanish learners sound overly even or flat to native ears.</p>

        <h2>Prepositions</h2>
        <p>Prepositions are among the trickiest areas for Spanish speakers because English and Spanish often pair different prepositions with the same concepts. These small words are highly idiomatic and don't follow simple translation rules. Common errors include <Highlight>married with</Highlight> instead of <Highlight>married to</Highlight> and <Highlight>arrive to</Highlight> instead of <Highlight>arrive at</Highlight> or <Highlight>arrive in</Highlight>. Time and place expressions also differ, leading to phrases that feel natural in Spanish but sound incorrect in English.</p>

        <p>Because prepositions rarely translate directly, they are best learned through repeated exposure in full sentences and real-life situations rather than through mechanical rules. This gradual internalization helps reduce persistent errors even at advanced levels.</p>

        <h2>Word Order</h2>
        <p>Spanish sentence structure is more flexible than English, allowing elements like objects or adverbs to shift positions for emphasis or style. English, by contrast, follows a stricter subject-verb-object order in most statements. This difference can result in awkward or unclear phrasing when Spanish speakers translate directly from their native patterns. Issues frequently appear in question formation, negation, adverb placement, and pronoun positioning.</p>

        <p>Focusing on complete English sentence patterns instead of building sentences word by word helps minimize interference from Spanish flexibility and leads to more natural, confident expression.</p>
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
