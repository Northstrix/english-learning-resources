'use client';

import React, { useState } from 'react';
import Highlight from '@/components/Highlight';
import BlogCredits from '@/components/BlogCredits';
import QuestionCard from '@/components/QuestionCard';
import SuggestedArticles from '@/components/SuggestedArticles';
import { blogs } from '@/lib/blog-data';

export default function BlogPage() {
  const articleData = blogs.find(b => b.id === 'common-difficulties-italian-speakers-face-when-learning-english')!;
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleAnswerChange = (id: string, values: string[]) => {
    setAnswers(prev => ({ ...prev, [id]: values }));
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
        <p>Italian and English belong to different language families — <Highlight>Romance</Highlight> and <Highlight>Germanic</Highlight> — so even when the two languages share Latin-derived vocabulary, they often organize grammar, meaning, and usage in very different ways. As a result, Italian speakers learning English often face predictable challenges with false friends, articles, pronunciation, prepositions, and verb patterns. These differences can remain difficult even at advanced levels, especially when a word looks familiar but behaves differently in real usage.</p>

        <h2>Vocabulary and False Friends</h2>
        <p>One of the most common sources of confusion is false friends: words that look or sound similar in both languages but have different meanings. A well-known example is the Italian word <Highlight>Nipote</Highlight>, which can mean either <Highlight>Nephew</Highlight>, <Highlight>Niece</Highlight>, <Highlight>Grandson</Highlight>, or <Highlight>Granddaughter</Highlight>. In English, those relationships are expressed with separate words: <Highlight>Nephew</Highlight> or <Highlight>Niece</Highlight> for a sibling’s child, and <Highlight>Grandson</Highlight> or <Highlight>Granddaughter</Highlight> for a child’s child. Because Italian uses one word for both relationships, learners often need extra context to understand the intended meaning. Another classic example is <Highlight>Caldo</Highlight>, which means <Highlight>Hot</Highlight> in Italian, even though it may look like the English word <Highlight>Cold</Highlight> at a glance.</p>

        <p>False friends can be especially misleading because they often create a strong but incorrect first impression. For instance, a learner may assume a familiar-looking Italian word can be translated directly into English, only to discover that the meaning is broader, narrower, or completely different. This is why vocabulary study should focus on meaning in context, not just spelling similarities. Learning common false friends early can save time and prevent repeated mistakes in speaking and writing.</p>

        <h2>Articles and Noun Usage</h2>
        <p>Although English article system is much simpler than Italian one, Italian speakers often struggle with articles because the two languages handle nouns in very different ways. One of the most common difficulties is the distinction between countable and uncountable nouns. In English, certain nouns can't be counted individually and don't take <Highlight>a</Highlight> or <Highlight>an</Highlight>. For example, words like <Highlight>Information</Highlight>, <Highlight>Furniture</Highlight>, <Highlight>News</Highlight>, <Highlight>Homework</Highlight>, <Highlight>Luggage</Highlight>, and <Highlight>Sugar</Highlight> are uncountable. Just as you can have <Highlight>some water</Highlight> or <Highlight>a lot of sugar</Highlight> but never <Highlight>one water</Highlight> or <Highlight>a sugar</Highlight> as a single piece, these nouns follow the same logic. Italian learners frequently produce mistakes such as <Highlight>an information</Highlight> or <Highlight>a furniture</Highlight> instead of the correct forms <Highlight>some information</Highlight> or <Highlight>a piece of furniture</Highlight>.</p>

        <p>Another frequent issue appears in general statements. Italian speakers may add or omit articles where English requires a different pattern, resulting in unnatural phrasing. This often happens in everyday expressions about habits, preferences, or abstract ideas. Repeated exposure to full sentences in context helps learners internalize when articles are needed and when they should be omitted.</p>

        <h2>Pronunciation Challenges</h2>
        <p>Italian and English have fundamentally different sound systems. Italian is highly phonetic, with words generally pronounced as they're written, whereas English contains many silent letters, reduced vowels, and irregular pronunciations. Italian speakers commonly struggle with the <Highlight>th</Highlight> sounds found in words like <Highlight>think</Highlight>, <Highlight>this</Highlight>, <Highlight>both</Highlight>, and <Highlight>mother</Highlight>, often replacing them with <Highlight>t</Highlight>, <Highlight>d</Highlight>, or <Highlight>f</Highlight> sounds. Additionally, English word stress patterns differ greatly from Italian, which can make spoken English sound overly flat or mechanical.</p>

        <p>English is a stress-timed language, meaning some syllables are emphasized while others are shortened or reduced. Italian, being syllable-timed, gives more equal weight to each syllable. This contrast affects overall rhythm and intonation. Common features to master include vowel reduction, such as turning <Highlight>I want to go</Highlight> into the more natural spoken reduction <Highlight>I wanna go</Highlight>, as well as linking words smoothly in connected speech.</p>

        <h2>Verb Patterns and Tenses</h2>
        <p>Phrasal verbs create significant difficulty because they're extremely common in daily English but rarely translate directly from Italian. Their meanings are often idiomatic and can't be understood by looking at the individual words. Examples include <Highlight>give up</Highlight> meaning to stop trying, <Highlight>look after</Highlight> meaning to take care of someone, <Highlight>run into</Highlight> meaning to meet by chance, <Highlight>put off</Highlight> meaning to postpone, and <Highlight>get along with</Highlight> meaning to have a good relationship with someone. Literal translations frequently result in confusing or incorrect expressions.</p>

        <p>English verb tenses add another layer of complexity because they convey more than simple time references. They also express duration, completion, and connection to the present moment. Italian speakers often confuse structures such as <Highlight>I work</Highlight> versus <Highlight>I am working</Highlight>, or <Highlight>I went</Highlight> versus <Highlight>I have gone</Highlight>. Choosing the right form depends heavily on context and the speaker’s intended meaning rather than a direct equivalent from Italian grammar.</p>

        <h2>Prepositions and Word Order</h2>
        <p>Prepositions are among the most challenging areas for Italian learners since English and Italian frequently use different prepositions for the same ideas. Typical errors include saying <Highlight>I am agree</Highlight> instead of <Highlight>I agree</Highlight>, <Highlight>dependent from</Highlight> instead of <Highlight>dependent on</Highlight>, or <Highlight>arrive to</Highlight> instead of <Highlight>arrive at</Highlight> or <Highlight>arrive in</Highlight>. Because prepositions are highly idiomatic, they're best learned through repeated exposure and natural usage rather than strict rule application.</p>

        <p>Word order can also lead to awkward or incorrect sentences. While both languages generally follow a subject-verb-object structure, Italian allows greater flexibility. This flexibility sometimes transfers into English, causing issues with question formation, adverb placement, negation, and pronoun positioning.</p>
      </section>

      {articleData.test && (
        <section className="border-t border-white/5 mt-12 relative">
            <h2>Test your knowledge</h2>
            <p>Test your knowledge of one of the concepts presented in this article.</p>
          <header className="mb-12">
          </header>

          <div className="space-y-8">
            {articleData.test.map((question, index) => (
              <QuestionCard 
                key={question.id}
                question={question}
                globalIndex={index + 1}
                totalQuestions={articleData.test!.length}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </div>
        </section>
      )}

      {articleData.credits && <BlogCredits markdown={articleData.credits} />}
      <SuggestedArticles currentArticleId={articleData.id} />
    </article>
  );
}