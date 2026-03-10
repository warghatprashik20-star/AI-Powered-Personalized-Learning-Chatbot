import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const topics = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
  "English",
];
const difficulties = ["Easy", "Medium", "Hard"];

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="rounded-xl border border-gray-800 bg-gray-900 p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-violet-400" />
        <h3 className="text-lg font-semibold">Quiz Generator</h3>
      </div>

      <div className="space-y-4">
        {/* Topic selector */}
        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            <option value="">Select a topic</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty selector */}
        <div>
          <label className="mb-1.5 block text-sm text-gray-400">
            Difficulty
          </label>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  difficulty === d
                    ? "bg-violet-600 text-white"
                    : "border border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/25">
          <Sparkles className="h-4 w-4" />
          Generate Quiz
        </button>
      </div>
    </motion.div>
  );
}
