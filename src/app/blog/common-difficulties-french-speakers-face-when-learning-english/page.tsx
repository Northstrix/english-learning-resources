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
  const articleData = blogs.find(b => b.id === 'common-difficulties-french-speakers-face-when-learning-english')!;
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
        <p>French and English share a large number of words due to their historical and Latin influences, but their structures, sound systems, and usage patterns differ in important ways. These differences often lead to recurring patterns that affect clarity, accuracy, and fluency when moving between the two languages.</p>

        <h2>Vocabulary And False Friends</h2>
        <p>French and English share lots of cognates, which can create an initial sense of familiarity. However, this overlap frequently leads to confusion through false friends—words that look similar but differ in meaning.  For instance, <Highlight>Actuellement</Highlight> corresponds to <Highlight>Currently</Highlight>, not <Highlight>Actually</Highlight>.</p>

        <p>These misleading similarities can significantly alter meaning if not recognized. Careful attention to context and repeated exposure to accurate pairings helps reinforce correct usage and reduces reliance on visual similarity alone.</p>

        <h2>Articles and Noun Gender</h2>
        <p>French assigns gender to all nouns and uses articles that must agree with them, while English relies on simpler, gender-agnostic articles. This difference often leads to confusion in article usage and noun treatment.</p>

        <p>For example, the French <Highlight>Une voiture</Highlight> corresponds to <Highlight>A car</Highlight>, while <Highlight>Le soleil</Highlight> translates to <Highlight>The sun</Highlight>, without any gender distinction in English. Difficulties become more noticeable with abstract or uncountable nouns. The French <Highlight>Un conseil</Highlight> corresponds to <Highlight>A piece of advice</Highlight>, not <Highlight>an advice</Highlight>, and <Highlight>Des progrès</Highlight> aligns with <Highlight>Progress</Highlight>, which is uncountable in English.</p>

        <p>These differences require adjusting how nouns are grouped and counted, as English often treats concepts as whole quantities rather than individual items.</p>

        <h2>Pronunciation Issues</h2>
        <p>Significant differences in sound systems affect clarity and intelligibility. English includes sounds that don't exist in French, particularly <Highlight>th</Highlight> in words like <Highlight>Think</Highlight> and <Highlight>This</Highlight>.</p>

        <h2>Verb Tenses</h2>
        <p>English expresses time through both tense and aspect, requiring attention to how actions relate to the present. For example, <Highlight>I've lived</Highlight> emphasizes a connection to the present, while <Highlight>I lived</Highlight> refers to a completed past action.</p>

        <p>Continuous forms such as <Highlight>I'm working</Highlight> highlight ongoing activity, which may not always align directly with French structures. Choosing the correct form depends heavily on context and intended meaning rather than direct translation.</p>

        <h2>Prepositions And Word Order</h2>
        <p>Prepositions vary significantly and must often be learned as fixed expressions. For example, <Highlight>good at</Highlight>, <Highlight>interested in</Highlight>, and <Highlight>afraid of</Highlight> don't map directly onto French equivalents. Misuse can make sentences sound unnatural or unclear.</p>

        <p>Word order in English is also more rigid. Standard subject-verb-object structure must be maintained consistently, especially in questions and negative sentences. Departing from this structure can reduce clarity or create confusion.</p>

        <h2>Phrasal Verbs and Idiomatic Expressions</h2>
        <p>Phrasal verbs represent another major challenge, as they combine a verb with one or more particles to create meanings that are often unpredictable. For example, <Highlight>give up</Highlight> means to stop trying, while <Highlight>find out</Highlight> means to discover a fact or piece of information. These meanings can't be understood by translating each word individually.</p>

        <p>Because these expressions are common in everyday English, understanding them is essential for both comprehension and communication. Learning them in context, rather than as isolated vocabulary, improves retention and helps develop more natural language use.</p>

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
