import { handleChat, GROQ_MODEL } from "../lib/chat-core.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { userMessage, conversationHistory } = request.body || {};
  const { status, body } = await handleChat({
    userMessage,
    conversationHistory,
    apiKey: process.env.GROQ_API_KEY,
  });

  return response.status(status).json(body);
}

export { GROQ_MODEL };
