export function prepareOptions(options: any[], type: string) {
  return options.map(opt => ({
    value: opt.id,
    text: opt.text
  }));
}

export function isScorableQuestion(question: any) {
  return !!question.correctValues;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
