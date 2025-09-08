import { useState } from "react";
import EmojiPuzzle from "./components/EmojiPuzzle";

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-5xl mb-4 title-fun">Welcome to EmotiContest!</h1>

      {/* Info Button */}
      <button
        onClick={() => setShowInfo((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showInfo ? "Hide Info" : "Show Info"}
      </button>

      {/* Info Panel */}
      {showInfo && (
        <div className="mb-6 p-4 bg-white rounded shadow max-w-md text-left text-gray-700">
          <p>🎯 Guess the words that match the emoji phrase below!</p>
          <p>  Ex: 🌽🐶 == "Corn Dog".</p>
          <p>❌ You have 5 wrong guesses allowed.</p>
          <p>✅ Correct guesses fill in the boxes above.</p>
          <p>💡 Type a word and press enter or click Guess.</p>
        </div>
      )}

      <p className="mb-6 text-gray-700">Try today’s puzzle below:</p>
      <EmojiPuzzle />
    </div>
  );
}

export default App;