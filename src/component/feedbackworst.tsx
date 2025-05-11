"use client";
import { useState } from "react";

export default function Feedbackworst() {
  const [message, setMessage] = useState("");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleCheckboxChange = (letter: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedLetters((prev) => [...prev, letter]);
      setMessage((prev) => prev + letter);
    } else {
      // Remove from selected letters
      setSelectedLetters((prev) => prev.filter((l) => l !== letter));

      // Only remove from the **last word** (after last space)
      const words = message.split(" ");
      const lastWord = words[words.length - 1];

      const lastIndex = lastWord.lastIndexOf(letter);
      if (lastIndex !== -1) {
        const updatedLastWord =
          lastWord.slice(0, lastIndex) + lastWord.slice(lastIndex + 1);
        words[words.length - 1] = updatedLastWord;
        setMessage(words.join(" "));
      }
    }
  };

  const addSpaceHandle = () => {
    setMessage((prev) => prev + " ");
  };
  const submitHandle = () => {
    console.log(message);
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex flex-col bg-white items-center justify-center p-10">
      <h1 className="text-5xl font-bold text-black mb-6">
        Worst Feedback Form
      </h1>

      <div className="grid grid-cols-6 gap-4 mb-6">
        {letters.map((letter) => (
          <label key={letter} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedLetters.includes(letter)}
              onChange={(e) => handleCheckboxChange(letter, e.target.checked)}
            />
            <span className="text-lg font-mono">{letter}</span>
          </label>
        ))}
      </div>

      <button
        className="bg-gray-300 px-3 py-2 rounded-xl mb-4"
        onClick={addSpaceHandle}
      >
        Add Space
      </button>

      {message ? (
        <div className="text-lg font-mono text-center">{message}</div>
      ) : (
        <div className="text-gray-500">
          If you mess up, just refresh the page and try again.
        </div>
      )}

      <button
        className="bg-gray-300 px-3 py-2 mt-6 rounded-xl"
        onSubmit={submitHandle}
      >
        Submit
      </button>
    </div>
  );
}
