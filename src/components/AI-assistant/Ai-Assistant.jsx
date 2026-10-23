import { useState, useRef, useEffect } from "react";
import { FiCpu, FiSend, FiX } from "react-icons/fi";

const AiAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm Asif's AI assistant. How can I help you today? You can ask me about skills, projects, experience, or anything about Asif!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage, conversationHistory) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 40000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ userMessage, conversationHistory }),
      });

      // The Vercel rewrite can return index.html instead of JSON
      const raw = await response.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          `The server returned a non-JSON response (status ${response.status}). Is the API server running?`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            data.error ||
            `API Request Failed with Status ${response.status}`,
        );
      }

      // Support both response shapes
      return (
        data.content ||
        data.choices?.[0]?.message?.content ||
        "I could not generate a response."
      );
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("The request timed out. Please try again.");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleSend = async () => {
    const userMsgText = input.trim();
    if (!userMsgText || isLoading) return;

    const userMessage = { type: "user", text: userMsgText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // History must EXCLUDE the message we just added, otherwise the
      // backend (which appends it again) receives it duplicated.
      // Filter BEFORE mapping, so `text` still exists on each message.
      const conversationHistory = messages
        .slice(-10)
        .filter(
          (msg) =>
            msg &&
            typeof msg.text === "string" &&
            msg.text.trim() &&
            !msg.text.startsWith("Error:"),
        )
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      const aiResponse = await getAIResponse(userMsgText, conversationHistory);
      setMessages((prev) => [...prev, { type: "bot", text: aiResponse }]);
    } catch (error) {
      console.error("Groq Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // NOTE: React 19 removed onKeyPress - must use onKeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-x-2 bottom-4 z-50 w-auto transition-all duration-300 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[min(24rem,calc(100vw-2.5rem))]'>
      <div
        role='dialog'
        aria-modal='false'
        aria-labelledby='ai-assistant-title'
        className='flex h-[min(600px,calc(100dvh-5rem))] w-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_20px_70px_-20px_rgba(31,41,55,0.45)]'
      >
        {/* Header */}
        <div className='flex shrink-0 items-center justify-between bg-gradient-to-br from-[#7c3aed] via-purple-600 to-[#2563eb] px-4 py-3.5 sm:px-5'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/95 shadow-sm'>
              <FiCpu className='text-lg text-purple-600' />
              <span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-purple-600 bg-emerald-400' />
            </div>
            <div className='min-w-0'>
              <h3 id='ai-assistant-title' className='truncate text-sm font-semibold text-white sm:text-base'>
                AI Assistant
              </h3>
              <p className='truncate text-xs text-purple-100'>
                Ask me anything about Asif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label='Close AI assistant'
            className='ml-3 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70'
          >
            <FiX className='text-lg' aria-hidden='true' />
          </button>
        </div>

        {/* Messages */}
        <div
          className='min-h-0 flex-1 space-y-1 overflow-y-auto bg-slate-50/90 p-3 sm:p-4'
          aria-live='polite'
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[82%] ${
                  message.type === "user"
                    ? "rounded-br-md bg-purple-600 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className='flex justify-start'>
              <div className='flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm'>
                <div className='h-2 w-2 animate-bounce rounded-full bg-purple-400'></div>
                <div
                  className='h-2 w-2 animate-bounce rounded-full bg-purple-400'
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className='h-2 w-2 animate-bounce rounded-full bg-purple-400'
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4'>
          <div className='flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition-colors focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Ask about skills, projects...'
              aria-label='Ask the AI assistant a question'
              className='min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400'
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label='Send message'
              className='flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <FiSend className='text-base' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
