import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function Inbox() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.auth.status);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchConversations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chat/conversations", {
          method: "GET",
          headers: { "auth-token": authToken },
        });
        const data = await res.json();
        if (data.success) {
          setConversations(data.conversations);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isLoggedIn, authToken, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen  text-white/80 ">
        {/* <Header /> */}
        <div className="flex justify-center items-center h-96">
          <p>Loading inbox...</p>
        </div>
        
      </div>
    );
  }

  return (
    <div className=" text-white/80">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-8 lg:max-w-[80vw]">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>

        {conversations.length === 0 ? (
          <div className="bg-[#1a1a1a] text-white/90 rounded-lg shadow p-8 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="">No conversations yet.</p>
            <p className="text-sm text-gray-400">Buyers who message you will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv) => (
              <div
                key={conv.userId}
                onClick={() => navigate(`/chat/user/${conv.userId}`)}
                className="bg-[#1a1a1a] text-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#dd3a44] rounded-full flex items-center justify-center text-white font-semibold">
                  {conv?.fullname?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold ">{conv?.fullname || "Unknown User"}</h3>
                  <p className="text-sm text-gray-500">{conv?.email}</p>
                </div>
                <div className="text-[#DD3a44]">
                  <MessageCircle className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}