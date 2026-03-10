import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Volume2 } from "lucide-react";

export default function VoiceAssistant() {
  const [message, setMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="rounded-xl border border-gray-800 bg-gray-900 p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <Volume2 className="h-5 w-5 text-violet-400" />
        <h3 className="text-lg font-semibold">Voice Learning Assistant</h3>
      </div>

      {/* Chat area */}
      <div className="mb-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800/50">
        <p className="text-sm text-gray-500">
          Ask a question to start learning...
        </p>
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-violet-500"
        />
        <button className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
          <Mic className="h-5 w-5" />
        </button>
        <button className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-2.5 text-white transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/25">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}
