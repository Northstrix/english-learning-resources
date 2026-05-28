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
  const articleData = blogs.find(b => b.id === 'learning-english-from-the-testaments')!;
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

      <div className="bg-[#0d0d0d] border border-white/5 p-4 md:p-6 mb-12">
        <h4 className="font-headline font-bold text-lg text-white tracking-tight mb-4">Educational disclaimer</h4>
        <p className="text-sm leading-relaxed text-[#aaaaaa] m-0 italic">
          Any reference to "The Testaments" TV series, or to any associated proprietary content protected by copyright law, including but not limited to related characters, titles, and other copyrighted elements, is included solely for educational, analytical, and language-learning purposes. This article is an independent work and is not affiliated with, sponsored by, endorsed by, or approved by the rightful owner(s) of the copyrighted content.
        </p>
      </div>

      <section className="text-left">
        <p>The first season of <Highlight href="https://www.imdb.com/title/tt10970762/">The Testaments</Highlight> has just finished. Those of you who learn English from TV shows might've used it as an opportunity to pick up a few words and phrases, but unlike shows such as <Highlight href="https://www.imdb.com/title/tt14186672/">Landman</Highlight> and <Highlight href="https://www.imdb.com/title/tt30923123/">The Audacity</Highlight>, which use modern vocabulary that fits day-to-day and professional contexts, this series uses the language of a fictional totalitarian society, so some expressions are better understood as worldbuilding than as phrases to reuse in real conversation.</p>

        <p>When you watch this show, the dialogue often sounds serious, elegant, and grammatically correct. That's exactly why it can be risky for English learners. Copying how these characters speak may cause you to sound overly formal, cult-like, or unnatural.</p>

        <h2>The obvious ones?</h2>
        <p>One of the most recognizable lines is <Highlight>Blessed be the fruit</Highlight>, usually followed by <Highlight>May the Lord open</Highlight>. You'll also hear phrases like <Highlight>Praise be</Highlight>. These aren't standard greetings in real life. In the show, they serve to monitor compliance and demonstrate submission within Gilead's society. In the actual English, use <Highlight>Hello</Highlight>, <Highlight>Good morning</Highlight>, or <Highlight>Good afternoon</Highlight> in formal situations, and <Highlight>Hi</Highlight>, <Highlight>How's it going?</Highlight> or <Highlight>Hey, what's up?</Highlight> in informal ones.</p>

        <h2>Local goodbye</h2>
        <p>When characters part ways, they often say <Highlight>Under His Eye</Highlight>. In the world of the show, this functions as both a farewell and a reminder of the society's totalitarian ethos. In everyday English, natural alternatives include <Highlight>Bye</Highlight>, <Highlight>See you</Highlight> (often pronounced as <Highlight>See ya</Highlight>), <Highlight>Have a nice day</Highlight>, or <Highlight>See you tomorrow</Highlight> when appropriate.</p>

        <h2>The Aunts' conversations</h2>
        <p>You should avoid using conversations between the Aunts as the reliable learning material. Characters like Aunt Lydia speak with a highly specific, artificial authority. Their speech patterns are unnatural for modern life — they use a cold, dictatorial tone filled with absolute commands. Their dialogue is designed to lecture, reprimand, or manipulate rather than engage in natural, reciprocal conversation.</p>

        <h2>So near yet so far</h2>
        <p>In the TV show, the word used to refer to infertility is <Highlight>Barrenness</Highlight>. In modern English, this term is primarily used to describe land with nothing growing on it or a plant that bears no fruit. While the word <Highlight>Barrenness</Highlight> can occasionally refer to infertility, this usage is uncommon and often sounds literary, formal, or elevated rather than conversational.</p>

        <h2>Metonymy</h2>
        <p>The show uses certain words in unusual ways to describe groups of people based on their clothing. For example, <Highlight>Plums</Highlight> refers to girls who wear the purple uniforms whose color resembles that of the plum fruit, while <Highlight>Pearls</Highlight> refers to another group associated with pearl-white clothing. These terms are part of the story's invented social hierarchy. In real life, native speakers don't typically refer to people by the color or object associated with their clothes. How often do you call someone who wears green clothes a <Highlight>Broccoli?</Highlight></p>

        <h2>Positive reactions</h2>
        <p>Another example is the phrase <Highlight>Blessed be his miracle</Highlight>, used to react to positive events. Bringing up miracles in casual modern conversations can sound overly dramatic or intensely religious. In real English, it's more natural to say <Highlight>Good</Highlight>, <Highlight>Great</Highlight>, <Highlight>That's great</Highlight>, or <Highlight>Congratulations</Highlight>, depending on the context.</p>

        <h2>How to actually use this TV show to learn English</h2>
        <p>Just because some words and phrases are specific to Gilead doesn't mean you can't learn English from <Highlight>The Testaments</Highlight>. As a general rule, you can improve your English vocabulary with this show as long as you remove the ritual greetings, farewells, and the Aunts' rigid interactions with other characters and one another from your learning material.</p>

        <p>Instead focus on the chats between characters who trust each other. This is where you'll find modern sentence structures, realistic pronunciation, and everyday words used in ordinary conversations.</p>
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
