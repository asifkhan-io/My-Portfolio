import { useState, useRef, useEffect } from "react";
import { FiCpu } from "react-icons/fi";

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
    <div className='fixed inset-x-4 bottom-20 sm:inset-x-auto sm:right-5 sm:left-auto z-50 transition-all duration-300 sm:max-w-96 w-auto'>
      <div
        className='bg-white w-full sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden'
        style={{ maxHeight: "min(85vh, 600px)" }}
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-purple-600 to-blue-500 p-3 sm:p-4 flex justify-between items-center shrink-0'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
              <FiCpu className='text-purple-600' />
            </div>
            <div>
              <h3 className='text-white font-semibold text-sm'>AI Assistant</h3>
              <p className='text-purple-100 text-xs'>
                Ask me anything about Asif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-white hover:text-purple-200 transition-colors'
          >
            <svg
              className='w-5 h-5 cursor-pointer'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className='min-h-0 flex-1 overflow-y-auto p-4 bg-gray-50'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg text-sm break-words ${
                  message.type === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className='flex justify-start mb-3'>
              <div className='bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none'>
                <div className='flex gap-1'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='p-3 border-t border-gray-200 bg-white'>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Ask about skills, projects...'
              className='flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm'
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 cursor-pointer'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
