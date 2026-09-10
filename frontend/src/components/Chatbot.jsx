import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { chatAPI } from "../api/client";

const initialMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Hi, I’m the Meeraxu Intelligence assistant. Ask me about our services, projects, or how we can help.",
};

const pageLinks = {
  Home: "/",
  About: "/about",
  Contact: "/contact",
  "Privacy Policy": "/privacy-policy",
  "Terms and Conditions": "/terms-and-conditions",
};

const messageLinkPattern =
  /\[([^\]]+)\]\((\/[^)]+)\)|\*\*([^*]+)\*\*|hello@meeraxu\.ai|admin@meeraxuintelligence\.com|\+91 75681 85591|Privacy Policy|Terms and Conditions|Home|About|Contact/gi;

function renderMessageContent(content, onNavigate) {
  const parts = [];
  let lastIndex = 0;

  for (const match of content.matchAll(messageLinkPattern)) {
    const [fullMatch, markdownLabel, markdownPath, boldLabel] = match;
    const start = match.index;
    if (start > lastIndex) parts.push(content.slice(lastIndex, start));

    if (boldLabel) {
      parts.push(
        <strong key={`${start}-${fullMatch}`} className="chatbot-bold">
          {boldLabel}
        </strong>,
      );
      lastIndex = start + fullMatch.length;
      continue;
    }

    const label = markdownLabel || fullMatch;
    const href =
      markdownPath ||
      (fullMatch.includes("@")
        ? `mailto:${fullMatch}`
        : fullMatch.startsWith("+")
          ? `tel:${fullMatch.replace(/\s/g, "")}`
          : pageLinks[fullMatch]);

    parts.push(
      <a
        key={`${start}-${fullMatch}`}
        href={href}
        className="chatbot-link"
        onClick={onNavigate}
      >
        {label}
      </a>,
    );
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return parts;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (event) => {
    event?.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", content: trimmedMessage },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const data = await chatAPI.send(trimmedMessage);
      setMessages((current) => [
        ...current,
        { id: `${Date.now()}-bot`, role: "bot", content: data.reply },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: "bot",
          content:
            error.message ||
            "I’m unable to respond right now. Please try again shortly.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-shell">
      {isOpen && (
        <section
          className="chatbot-window"
          aria-label="Meeraxu Intelligence chat"
        >
          <header className="chatbot-header">
            <div className="chatbot-brand">
              <span className="chatbot-brand-icon">
                <Bot size={19} />
              </span>
              <div>
                <strong>Meeraxu AI</strong>
                <span>
                  <i /> Online assistant
                </span>
              </div>
            </div>
            <button
              className="chatbot-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item) => (
              <div key={item.id} className={`chatbot-message-row ${item.role}`}>
                {item.role === "bot" && (
                  <span className="chatbot-avatar">
                    <Sparkles size={14} />
                  </span>
                )}
                <p className={item.isError ? "chatbot-error" : ""}>
                  {renderMessageContent(item.content, () => setIsOpen(false))}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message-row bot">
                <span className="chatbot-avatar">
                  <Sparkles size={14} />
                </span>
                <div
                  className="chatbot-typing"
                  aria-label="Assistant is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-composer" onSubmit={sendMessage}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask Meeraxu anything..."
              maxLength={4000}
              aria-label="Message Meeraxu AI"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!message.trim() || isLoading}
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        className={`chatbot-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close Meeraxu AI chat" : "Open Meeraxu AI chat"}
        aria-expanded={isOpen}
      >
        <span className="chatbot-robot-icon">
          <Bot size={27} strokeWidth={1.8} />
        </span>
      </button>
    </div>
  );
}
