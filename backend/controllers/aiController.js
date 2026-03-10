const axios = require("axios");

// OpenAI API endpoint
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// System prompt to make the AI behave as a personalized tutor
const TUTOR_SYSTEM_PROMPT = `You are an AI-powered personalized learning tutor. Your role is to:
- Explain concepts clearly and concisely
- Adapt your teaching style to the student's level
- Use examples and analogies to make complex topics easy to understand
- Encourage the student and provide positive reinforcement
- Break down complex problems into smaller steps
- Ask follow-up questions to check understanding
Keep responses focused and educational.`;

// ==========================================
// AI Tutor Chat
// POST /api/ai/chat
// Sends the student's message to OpenAI and returns the tutor's answer
// ==========================================
exports.chatAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Build message array with system prompt + user message
    const messages = [
      { role: "system", content: TUTOR_SYSTEM_PROMPT },
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the AI-generated answer
    res.json({
      answer: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Chat Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI service error" });
  }
};

// ==========================================
// Quiz Generator
// POST /api/ai/generate-quiz
// Generates multiple-choice quiz questions using AI
// ==========================================
exports.generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty = "medium", questions = 5 } = req.body;

    // Validate input
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // Prompt engineered to return structured quiz JSON
    const prompt = `Generate exactly ${questions} ${difficulty} difficulty multiple-choice quiz questions about "${topic}".

Return ONLY a valid JSON array (no markdown, no extra text) in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]

The "answer" field must be the exact text of the correct option from the options array.`;

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    // Parse the AI response into structured JSON
    let quizData;
    try {
      quizData = JSON.parse(content);
    } catch {
      // Fallback: extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[1].trim());
      } else {
        return res.status(500).json({ message: "Failed to parse quiz data" });
      }
    }

    // Return quiz array directly
    res.json(quizData);
  } catch (error) {
    console.error("Quiz Gen Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Quiz generation failed" });
  }
};
