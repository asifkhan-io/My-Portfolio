import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleChat, GROQ_MODEL } from "./lib/chat-core.js";

// Load BOTH .env and .env.local (dotenv.config() alone only reads .env,
// so the key in .env.local was never picked up -> "Bearer undefined" -> 401)
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
    model: GROQ_MODEL,
  });
});

app.post("/api/chat", async (req, res) => {
  const { userMessage, conversationHistory } = req.body || {};
  const { status, body } = await handleChat({
    userMessage,
    conversationHistory,
    apiKey: process.env.GROQ_API_KEY,
  });
  res.status(status).json(body);
});

app.listen(PORT, () => {
  console.log(`API server on http://localhost:${PORT}`);
  console.log(
    `GROQ_API_KEY: ${process.env.GROQ_API_KEY ? "loaded" : "MISSING"} | model: ${GROQ_MODEL}`,
  );
});
