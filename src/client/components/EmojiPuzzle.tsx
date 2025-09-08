import React, { useState } from "react";
import { puzzles, Puzzle } from "../../shared/puzzles";
import GuessInput from "./GuessInput";

export default function EmojiPuzzle() {
  const getDailyIndex = (epoch: Date, puzzlesCount: number): number => {
    const today = new Date();
    const startOfDayEpoch = Date.UTC(epoch.getFullYear(), epoch.getMonth(), epoch.getDate());
    const startOfDayToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const dayDifference = Math.floor((startOfDayToday - startOfDayEpoch) / (1000 * 60 * 60 * 24));
    return dayDifference % puzzlesCount;
  };

  const todayIndex = getDailyIndex(new Date("2024-01-01"), puzzles.length);
  const todayPuzzle: Puzzle | undefined = puzzles[todayIndex];

  if (!todayPuzzle) return <div>No puzzle found!</div>;

  const answerWords: string[] = todayPuzzle.answer.split(" ");
  const [guessedWords, setGuessedWords] = useState<string[]>(Array(answerWords.length).fill(""));
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [wrongWords, setWrongWords] = useState<string[]>([]);

  function handleGuess(word: string): boolean {
    const lowerWord = word.toLowerCase();
    let matched = false;

    const newGuessedWords = guessedWords.map((guessedWord, i) => {
      const answerWord = answerWords[i];
      if (guessedWord === "" && answerWord.toLowerCase() === lowerWord) {
        matched = true;
        return answerWord; // reveal the word
      }
      return guessedWord;
    });

    if (matched) {
      setGuessedWords(newGuessedWords);
    } else {
      setWrongGuesses((prev) => prev + 1);
      setWrongWords((prev) => [...prev, word]);
    }

    return matched;
  }

  const isSolved = guessedWords.every((w, i) => w === answerWords[i]);
  const isGameOver = wrongGuesses >= 5 && !isSolved;

  return (
    
    <div className="flex flex-col items-center text-center space-y-10 font-sans">
      {/* Emojis */}
      <h2 className="text-5xl">{todayPuzzle.emojis}</h2>

      {/* Word boxes */}
      <div className="flex justify-center gap-8 flex-wrap">
        {answerWords.map((answerWord, i) => {
          const word = guessedWords[i];
          const length = answerWord?.length ?? 1;

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              {/* Underscores (always reserve space) */}
              <div className="text-gray-400 text-sm tracking-widest min-h-[1.25rem]">
                { !word && !isGameOver
    ? Array(5).fill("⬜️").map((box, idx) => <span key={idx}>{box}</span>)
    : null
  }
              </div>

              {/* Word box */}
              <div
                className={`flex items-center justify-center w-32 h-14 border-2 rounded-xl px-2 font-mono text-lg
                  ${word
                    ? "bg-green-500 text-white border-green-700"
                    : isGameOver
                      ? "bg-red-100 border-red-400"
                      : "bg-white border-gray-400"}`}
              >
                {word || (isGameOver ? answerWord : "")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input + Wrong Guesses */}
      {!isSolved && !isGameOver && (
        <div className="space-y-4">
          <GuessInput onGuess={handleGuess} />
          <p className="text-sm text-gray-600">
            Wrong guesses: {wrongGuesses} / 5
          </p>

          {/* Wrong Attempts List */}
          {wrongWords.length > 0 && (
            <div className="mt-6 text-center">
              <p className="font-semibold text-red-700 mb-3 text-lg tracking-wide">
                Wrong Attempts
              </p>
              <ul className="space-y-4">
                {wrongWords.map((w, idx) => (
                  <li
                    key={idx}
                    className="px-5 py-2.5 bg-red-50 border border-red-300 rounded-xl 
                               text-red-800 font-sans text-lg shadow-sm"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Win Message */}
      {isSolved && (
        <div className="text-2xl font-bold text-green-600 mt-8">
          🎉 You solved it! 🎉
        </div>
      )}

      {/* Game Over */}
      {isGameOver && (
        <div className="text-2xl font-bold text-red-600 mt-8">
          ❌ Game over! The answer was:{" "}
          <span className="underline">{todayPuzzle.answer}</span>
        </div>
      )}
    </div>
  );
}
