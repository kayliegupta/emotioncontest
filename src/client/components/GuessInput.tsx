// src/client/GuessInput.tsx
import React, { useState } from "react";

interface Props {
  onGuess: (word: string) => boolean; // Returns true if the guess was correct
}

export default function GuessInput({ onGuess }: Props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  function submitGuess(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const isCorrect = onGuess(trimmed);
    setMessage(isCorrect ? "✅ Correct!" : "❌ Try again!");
    setInput(""); // clear input after guess
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <form onSubmit={submitGuess} className="flex gap-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word..."
          className="border rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guess
        </button>
      </form>
      {message && <span className="text-sm text-gray-700">{message}</span>}
    </div>
  );
}