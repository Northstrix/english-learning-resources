export interface NodeData {
  text: string;
  color?: string;
  isPrimary?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'multiple-choice' | 'single-choice';
  options: QuestionOption[];
  correctValues: string[];
  image?: string;
  imageBgColor?: string;
  sectiontext?: string;
}

export interface FlashcardData {
  word: string;
  definition: string;
  imageUrl: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  backgroundText: string;
  description: string;
  credits?: string;
  visualization: {
    nodes: NodeData[];
  };
  test?: Question[];
  flashcards?: FlashcardData[];
}

export const blogs: BlogArticle[] = [
  {
    id: 'learning-english-from-the-testaments',
    title: 'Learning English from "The Testaments:" What Vocabulary to Keep and What to Skip',
    category: 'Vocabulary Analysis',
    date: 'May 28th 2026',
    readTime: '5 min read',
    backgroundText: 'PLUM',
    description: 'The first season of "The Testaments" has just finished. Those of you who learn English from TV shows might\'ve used it as an opportunity to pick up a few words and phrases, but unlike...',
    credits: `Photo by [Yulia Khlebnikova](https://unsplash.com/@khlebnikovayulia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/blueberries-in-glass-containers-and-on-white-surface-gXKboHMHe5M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Paloma Lima](https://www.pexels.com/@palomalimafotos/) from [Pexels](https://www.pexels.com/photo/close-up-of-a-pearl-on-rough-stone-surface-33348521/)
Photo by [JAEHOON PARK](https://unsplash.com/@jaehoonpk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/sliced-orange-fruits-on-white-surface-la3oGCK0YtI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [ABHISHEK HAJARE](https://unsplash.com/@abhishek_hajare?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/orange-juice-in-clear-drinking-glass-kkrXVKK-jhg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Eiliv Aceron](https://unsplash.com/@shootdelicious?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/person-pours-milk-into-glass-_8bnn1GqX70?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Elena Leya](https://unsplash.com/@foodistika?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-cup-of-tea-with-a-spoon-next-to-it-V-1DQFYW_9Q?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Art Rachen](https://unsplash.com/@artrachen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/clear-glass-jar-with-brown-liquid-Asj5DFw8UAw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Elizabeth Liebenberg](https://www.pexels.com/@elizabeth-liebenberg-3319039/) from [Pexels](https://www.pexels.com/photo/peaches-in-close-up-shot-14421743/)
Photo by [Maria Kovalets](https://unsplash.com/@marylooo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-bowl-of-broccoli-on-a-white-cloth-FTX_ooU_FY0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
Photo by [Lisa from Pexels](https://www.pexels.com/@fotios-photos/) from [Pexels](https://www.pexels.com/photo/elegant-mint-green-dress-in-stylish-closet-37002319/)`,
    visualization: {
      nodes: [
        { text: 'Plum', color: '#8F14E6', isPrimary: true },
        { text: 'Blessed be the fruit', color: '#aaaaaa' },
        { text: 'Praise be', color: '#aaaaaa' }
      ]
    },
    flashcards: [
      { word: "Plum", definition: "A small, sweet fruit with smooth skin and a stone inside.", imageUrl: "/flashcards/plum.webp" },
      { word: "Pearl", definition: "A small, shiny gem formed inside an oyster or other shellfish.", imageUrl: "/flashcards/pearl.webp" },
      { word: "Orange", definition: "A round citrus fruit with a tough peel and juicy segments.", imageUrl: "/flashcards/orange.webp" },
      { word: "Juice", definition: "The liquid taken from fruits or vegetables.", imageUrl: "/flashcards/juice.webp" },
      { word: "Milk", definition: "A white liquid produced by animals and used as a drink or in food.", imageUrl: "/flashcards/milk.webp" },
      { word: "Tea", definition: "A hot drink made by soaking dried tea leaves in water.", imageUrl: "/flashcards/tea.webp" },
      { word: "Honey", definition: "A sweet, sticky substance made by bees from flower nectar.", imageUrl: "/flashcards/honey.webp" },
      { word: "Peach", definition: "A soft, round fruit with fuzzy skin and a large pit inside.", imageUrl: "/flashcards/peach.webp" },
      { word: "Broccoli", definition: "A green vegetable with a thick stalk and tree-like flower heads.", imageUrl: "/flashcards/broccoli.webp" },
      { word: "Dress", definition: "A one-piece piece of clothing worn by girls or women.", imageUrl: "/flashcards/dress.webp" }
    ]
  },
  {
    id: 'common-difficulties-italian-speakers-face-when-learning-english',
    title: 'Common Difficulties Italian Speakers Face When Learning English',
    category: 'Linguistic Analysis',
    date: 'May 28th 2026',
    readTime: '7 min read',
    backgroundText: 'NIPOTE',
    description: 'Italian speakers often mix up English family words, so this article highlights the most common traps and how to avoid them.',
    visualization: {
      nodes: [
        { text: 'Nipote', color: '#146DE9', isPrimary: true },
        { text: 'Nephew', color: '#aaaaaa' },
        { text: 'Niece', color: '#aaaaaa' },
        { text: 'Grandson', color: '#aaaaaa' },
        { text: 'Granddaughter', color: '#aaaaaa' }
      ]
    },
    test: [
      {
        id: 'q1',
        text: 'How do you call a son of your brother or sister?',
        type: 'single-choice',
        options: [
          { id: 'nephew', text: 'Nephew' },
          { id: 'niece', text: 'Niece' },
          { id: 'grandson', text: 'Grandson' },
          { id: 'granddaughter', text: 'Granddaughter' }
        ],
        correctValues: ['nephew']
      },
      {
        id: 'q2',
        text: 'How do you call a daughter of your brother or sister?',
        type: 'single-choice',
        options: [
          { id: 'nephew', text: 'Nephew' },
          { id: 'niece', text: 'Niece' },
          { id: 'grandson', text: 'Grandson' },
          { id: 'granddaughter', text: 'Granddaughter' }
        ],
        correctValues: ['niece']
      },
      {
        id: 'q3',
        text: 'How do you call a son of your child?',
        type: 'single-choice',
        options: [
          { id: 'nephew', text: 'Nephew' },
          { id: 'niece', text: 'Niece' },
          { id: 'grandson', text: 'Grandson' },
          { id: 'granddaughter', text: 'Granddaughter' }
        ],
        correctValues: ['grandson']
      },
      {
        id: 'q4',
        text: 'How do you call a daughter of your child?',
        type: 'single-choice',
        options: [
          { id: 'nephew', text: 'Nephew' },
          { id: 'niece', text: 'Niece' },
          { id: 'grandson', text: 'Grandson' },
          { id: 'granddaughter', text: 'Granddaughter' }
        ],
        correctValues: ['granddaughter']
      }
    ]
  },
  {
    id: 'difficulties-russian-speakers-may-encounter-when-learning-english',
    title: 'Difficulties Russian Speakers May Encounter When Learning English',
    category: 'Linguistic Analysis',
    date: 'May 28th 2026',
    readTime: '6 min read',
    backgroundText: 'MASLO',
    description: 'Why the Russian word "Maslo" causes confusion between dairy and engine products, plus other common hurdles.',
    credits: `Photo by [Olha Maltseva](https://www.pexels.com/@olha-maltseva-2156976676/) from [Pexels](https://www.pexels.com/photo/sunlit-tomato-bruschetta-with-butter-34514398/)
Photo by [Pixabay](https://www.pexels.com/@pixabay/) from [Pexels](https://www.pexels.com/photo/bowl-being-poured-with-yellow-liquid-33783/)`,
    visualization: {
      nodes: [
        { text: 'Maslo', color: '#146DE9', isPrimary: true },
        { text: 'Oil', color: '#aaaaaa' },
        { text: 'Butter', color: '#aaaaaa' }
      ]
    },
    flashcards: [
      { word: "Oil", definition: "A liquid, non-dairy fat pressed from plants/seeds, or a synthetic/crude-oil liquid like motor oil.", imageUrl: "/flashcards/oil.webp" },
      { word: "Butter", definition: "A solid dairy fat churned from milk cream.", imageUrl: "/flashcards/butter.webp" }
    ]
  },
  {
    id: 'why-english-can-be-tricky-for-german-speakers',
    title: 'Why English Can Be Tricky for German Speakers: Key Challenges and How to Overcome Them',
    category: 'Linguistic Analysis',
    date: 'May 28th 2026',
    readTime: '7 min read',
    backgroundText: 'GIFT',
    description: 'German and English share common roots, but "False Friends" like "Gift" can lead to dangerous misunderstandings.',
    visualization: {
      nodes: [
        { text: 'Gift', color: '#146DE9', isPrimary: true },
        { text: 'Present', color: '#9014E9' },
        { text: 'Poison', color: '#6DE914' }
      ]
    }
  },
  {
    id: 'common-linguistic-challenges-spanish-speakers-face-when-learning-english',
    title: 'Common Linguistic Challenges Spanish Speakers Face When Learning English',
    category: 'Linguistic Analysis',
    date: 'May 28th 2026',
    readTime: '8 min read',
    backgroundText: 'ESTAR',
    description: 'Spanish and English differ significantly in grammar and sounds. Discover how to avoid common pitfalls.',
    visualization: {
      nodes: [
        { text: 'Embarazada', color: '#146DE9', isPrimary: true },
        { text: 'Pregnant', color: '#aaaaaa' },
        { text: 'Embarrassed', color: '#aaaaaa' }
      ]
    }
  },
  {
    id: 'common-difficulties-french-speakers-face-when-learning-english',
    title: 'Common Difficulties French Speakers Face When Learning English',
    category: 'Linguistic Analysis',
    date: 'May 28th 2026',
    readTime: '6 min read',
    backgroundText: 'ACTUEL',
    description: 'French and English share many roots, but language families and structures create typical challenges for learners.',
    visualization: {
      nodes: [
        { text: 'Actuellement', color: '#146DE9', isPrimary: true },
        { text: 'Currently', color: '#aaaaaa' },
        { text: 'Actually', color: '#E91D41' }
      ]
    }
  }
];