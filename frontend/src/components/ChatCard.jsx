import React from "react";

function ChatCard({ conversation }) {
  console.log(conversation)
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatTime = (t) => {
    const date = new Date(t);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="flex bg-[#1a1a1a] justify-between items-center mx-5 px-5 rounded-xl my-5 py-3">
      <div className="flex items-center">
        <div className="rounded-full h-15 w-15 bg-white/50"></div>
        {/* <img className='h-15 w-15 rounded-full bg-white/50' src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg" alt="photo"  /> */}
        <div className="ms-5">
          <h1 className="text-xl">{capitalize(conversation.fullname)}</h1>
          <p className="text-white/60">{conversation.lastMessage}</p>
        </div>
      </div>
      <div>
        <span>{formatTime(conversation.lastMessageAt)}</span>
      </div>
    </div>
  );
}

export default ChatCard;
