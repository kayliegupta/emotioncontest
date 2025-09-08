export interface Puzzle {
  emojis: string;
  answer: string;
}

export const puzzles: Puzzle[] = [
  { emojis: "😃➡️🍀", answer: "happy go lucky" },
  { emojis: "🌧️🐱🐶", answer: "raining cats and dogs" },
  { emojis: "🍎🙈👀", answer: "apple of my eye" },
  { emojis: "💄👀🐝🤝", answer: "beauty is in the eye of the beholder" },
  { emojis: "🕥🐷🪽", answer: "when pigs fly" },
  { emojis: "🍞🥇🏆", answer: "breadwinner" },
  { emojis: "💰💪🏼🦵🏽", answer: "costs an arm and a leg" },
];