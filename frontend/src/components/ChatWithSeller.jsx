import { useState, useEffect, useRef } from "react";
import connectWS from "../connectWS.js";
import ChatCard from "./ChatCard.jsx";
import { useParams } from "react-router-dom";
import MessageCard from "./MessageCard.jsx";
import { useSelector } from "react-redux";

function ChatWithSeller() {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sellerId, setSellerId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isTyping, setIsTyping] = useState({})
  const authToken = localStorage.getItem("auth-token")
  
  const bottomRef = useRef();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null)
  const [text, setText] = useState("");

  const { productId, senderId: senderIdFromRoute } = useParams();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(()=> {
    const token = localStorage.getItem('auth-token');

    fetch(`https://tech-exchange-backend.onrender.com/api/auth/getuser`, {
      headers : {
        "auth-token" : token,
      },
    } ).then((res) => res.json()).then((data)=> {
    setUser(data.user);
    setUserId(data.user._id);
  }).catch((err) =>console.log(err.message) )
  }, [])

  useEffect(() => {
    // console.log("productId : " , productId)
    if (!productId) return;
    fetch(`https://tech-exchange-backend.onrender.com/api/chat/${productId}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSellerId(data.sellerId);
      });
    console.log("sellerID", sellerId);
  }, [productId]);

  useEffect(() => {
    if (!senderIdFromRoute) return;

    // directly set sellerId when coming from chat list
    setSellerId(senderIdFromRoute);
  }, [senderIdFromRoute]);

  // Auto scroll to latest message
  useEffect(() => {
  if (!authToken || !sellerId) return;
  if(!userId) return;
  if (userId === sellerId) return;


  socketRef.current = io("https://tech-exchange-backend.onrender.com", {
    auth: {
      token: authToken,
    },
  });

  

  // join room
  socketRef.current.emit("joinRoom", {
    otherUserId: sellerId,
  });

  // receive message
  socketRef.current.on("receiveMessage", (data) => {
    setMessages((prev) => [...prev, data]);
  });

    return () => {
      socketRef.current.off("roomNotice")
      socketRef.current.off("chatMessage")
      // socketRef.current.off("receiveTyping")
      socketRef.current.off("roomNotice")
      socketRef.current.off("roomNotice")
    };
  }, [sellerId]);

  const sendMessage = (e) => {
    if(e) e.preventDefault();

    const t = text.trim();
    if (!t) return;

    const msg = {
      sellerId,
      text: t,
    };

    // send to server
    socketRef.current.emit("chatMessage", msg);

    setText("");
  };


  useEffect(()=>{
    if(!user) return;
    if(text) {
      const details = {
        id : userId,
        name : user?.fullname,
      }
      socketRef.current.emit("typing" , details)
    }
  } , [text])

  return (
    <div className="flex w-full h-[70%] overflow-hidden">
      {/* first part */}
      <div className="hidden lg:block md:flex-[2] h-[87vh] custom-scroll  ms-2 rounded-md border border-gray-500 rounded-tl-md text-white">
        <hr className=" text-gray-500 w-full" />
        <div className="">
          <h1 className="text-2xl font-bold px-5 py-5">Chats</h1>
        </div>
        <div className="overflow-auto h-[85%]">
          {/* show all cards of msgs */}
          {conversations.map((conversation) => (
            <ChatCard conversation={conversation} key={conversation.userId} />
          ))}
        </div>
      </div>

      {/* second part */}
      <div className="flex-[5] h-[87vh] border border-gray-500 mx-2 lg:me-5 rounded-md  text-white">
        <div className=" flex items-center">
          <h1 className="text-2xl font-bold px-5 py-5">{user?.fullname}</h1>
          <p className="px-5 py-5">{isTyping.status ? isTyping.name : ""}</p>
        </div>
        <hr className=" text-gray-500 w-full" />

        <div className="h-[70%] overflow-auto custom-scroll w-full">
          {messages.map((m, index) => (
            <MessageCard
              key={index}
              message={m}
              isMe={m.senderId === userId}
              className={
                m.senderId === userId ? "justify-end" : "justify-start"
              }
            />
          ))}

          <div ref={bottomRef}></div>
        </div>

        {/* <hr className=" text-gray-500 w-full" /> */}
        <div className="h-[21%] flex items-center ms-5 ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            type="text"
            className="w-[90%] h-14 bg-[#333333]  outline ps-15 py-2 text-2xl text-white outline-white rounded-s-full  "
          />
          <button
            onClick={sendMessage}
            
            className="w-fit  bg-[#dd3a44] rounded-e-2xl py-4 px-5 text-xl me-2"
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWithSeller;
