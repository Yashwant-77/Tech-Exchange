function MessageCard({ className, message , isMe }) {
  

  const time = new Date(message.createdAt)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex w-full ${className}   overflow-hidden`}>
      <div className={`relative px-3  py-2 mx-4 my-2 max-w-xs rounded-2xl text-white 
        ${isMe ? "bg-[#dd2a44]" : "bg-[#1a1a1a]"}`}
      >
        <p className="pr-10 me-2">{message.text}</p>

        <span className="absolute bottom-1 right-2 text-[10px] opacity-70">
          {time}
        </span>
      </div>
    </div>
  );
}


export default MessageCard;