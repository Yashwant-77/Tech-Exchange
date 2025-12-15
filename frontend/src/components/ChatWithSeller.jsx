import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function ChatWithSeller() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const authToken = localStorage.getItem("auth-token");
  const userId = localStorage.getItem("userId"); // store this when user logs in

  // Fetch seller info
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/auth/getuser`, {
          method: "GET",
          headers: { "auth-token": authToken },
        });
        const data = await res.json();
        if (data.success) {
          setSeller(data.user);
        }
      } catch (err) {
        console.error("Error fetching seller:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [authToken]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/chat/messages/${sellerId}`,
          {
            method: "GET",
            headers: { "auth-token": authToken },
          }
        );
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [sellerId, authToken]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          recipientId: sellerId,
          message: input,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages([...messages, data.message]);
        setInput("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#efe6de]">
        <div className="flex justify-center items-center h-96">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efe6de] flex flex-col">

      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-96">
          {/* Header */}
          <div className="bg-[#dd3a44] text-white p-4 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-semibold text-lg">
                {seller?.fullname || "Seller"}
              </h2>
              <p className="text-xs opacity-90">{seller?.email}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.senderId === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderId === userId
                        ? "bg-[#dd3a44] text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#dd3a44]"
            />
            <button
              onClick={handleSend}
              className="bg-[#dd3a44] text-white p-2 rounded-xl hover:bg-[#E85C64]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}