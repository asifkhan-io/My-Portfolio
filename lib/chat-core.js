/**
 * Shared chat logic for the portfolio AI assistant.
 *
 * Used by:
 *   - api/chat.js     (Vercel serverless function / production)
 *   - server.js       (standalone Express server)
 *   - vite.config.js  (dev middleware, so `npm run dev` works on its own)
 *
 * Lives outside /api so Vercel does not treat it as a route.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const REQUEST_TIMEOUT_MS = 30000;

// llama-3.3-70b-versatile is no longer available on Groq -> 404 model_not_found
export const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-20b";

const SYSTEM_PROMPT = `You are the AI assistant on Asif Khan's portfolio website.
You help visitors learn about Asif, his skills, projects and experience.
Asif is a frontend web developer based in Islamabad, skilled in React, Next.js,
JavaScript, TypeScript and Tailwind CSS.
Keep every reply brief (2-3 sentences) and friendly.`;

/**
 * @param {object} input
 * @param {string} input.userMessage
 * @param {Array<{role: string, content: string}>} [input.conversationHistory]
 * @param {string} input.apiKey
 * @returns {Promise<{status: number, body: object}>}
 */
export async function handleChat({ userMessage, conversationHistory, apiKey }) {
  if (!apiKey || !apiKey.trim()) {
    return {
      status: 500,
      body: { error: "GROQ_API_KEY is not configured" },
    };
  }

  if (typeof userMessage !== "string" || !userMessage.trim()) {
    return { status: 400, body: { error: "A message is required" } };
  }

  // Keep only the last 10 well-formed turns
  const history = (Array.isArray(conversationHistory) ? conversationHistory : [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-10);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userMessage.trim() },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq error:", groqRes.status, data?.error?.message);
      return {
        status: groqRes.status,
        body: { error: data?.error?.message || "Groq request failed" },
      };
    }

    // Reasoning models (gpt-oss) can burn the whole budget on `reasoning`
    // and return an empty `content` when finish_reason is "length".
    const content = data.choices?.[0]?.message?.content?.trim();

    return {
      status: 200,
      body: {
        choices: data.choices,
        content: content || "I could not generate a response. Please try again.",
      },
    };
  } catch (error) {
    const aborted = error.name === "AbortError";
    console.error("Chat error:", error.message);
    return {
      status: aborted ? 504 : 500,
      body: {
        error: aborted
          ? "The AI took too long to respond. Please try again."
          : error.message || "The AI service is unavailable",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}