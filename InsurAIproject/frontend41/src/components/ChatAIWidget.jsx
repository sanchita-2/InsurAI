import React, { useState, useRef } from "react";
import "./ChatAIWidget.css";

export default function ChatAIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi 👋 I am InsureAI. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);

  
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition && !recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
  }

 
  const getAIResponse = (text) => {
    const t = text.toLowerCase();

    if (t.includes("buy") && t.includes("policy"))
      return "You can buy a policy from the Home page by clicking Buy Policy.";
    if (t.includes("cancel"))
      return "You can cancel your policy from User Dashboard → My Policies.";
    if (t.includes("renew"))
      return "You can renew cancelled policies from your dashboard.";
    if (t.includes("appointment"))
      return "Appointments can be booked from the dashboard.";
    if (t.includes("premium"))
      return "Premium depends on the policy and coverage you select.";
    if (t.includes("hello") || t.includes("hi"))
      return "Hello 😊 How can I assist you today?";

    return "Sorry, I didn't understand. Please try again.";
  };


  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

 
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    const aiText = getAIResponse(text);
    const aiMsg = { from: "ai", text: aiText };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput("");
    speak(aiText);
  };

  
  const startVoice = () => {
    if (!recognitionRef.current) {
      alert("Voice not supported in this browser");
      return;
    }

    recognitionRef.current.start();
    recognitionRef.current.onresult = (e) => {
      sendMessage(e.results[0][0].transcript);
    };
  };

  return (
    <>
      <div className="chat-fab" onClick={() => setOpen(!open)}>
        🤖
      </div>
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            InsureAI Assistant
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.from === "ai" ? "ai" : "user"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <button onClick={startVoice}>🎤</button>
            <input
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
