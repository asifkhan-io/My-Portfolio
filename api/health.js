/**
 * Health check for the deployed AI assistant.
 * Open https://<your-deployment>/api/health in a browser.
 *
 * If this returns JSON  -> the function IS deployed (go to "env" below)
 * If this returns HTML  -> the function is NOT deployed / rewrites swallowed it
 * If env.hasGroqKey is false -> add GROQ_API_KEY in the Vercel dashboard
 */
export default function handler(request, response) {
  const key = process.env.GROQ_API_KEY;

  return response.status(200).json({
    ok: true,
    functionDeployed: true,
    env: {
      hasGroqKey: Boolean(key && key.trim()),
      keyLength: key ? key.trim().length : 0,
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      node: process.version,
    },
  });
}