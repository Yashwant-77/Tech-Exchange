// All imports are here 
import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import connectToMongoDB from './db.js'
import cors from 'cors'
import http from 'http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import Message from './models/Message.js'
import chatRouter from './routes/chat.js'

// env Configurations
dotenv.config();

// Initializations
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET

// Connect to Database
connectToMongoDB();



// Allow frontend to access backend APIs
// app.use(cors({ origin: ["http://localhost:5173" , "https://tech-exchange-frontend.onrender.com"]}))
app.use(cors({ origin: "https://tech-exchange-frontend.onrender.com"}))



// Middlewares to use json data in request body
app.use(express.json());

// Routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/chat', chatRouter)


// socket io server
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication token missing"))
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded.user;

    next();
  }
  catch (err) {
    next(new Error("Authentication failed"))
  }
})


function getChatId(user1, user2) {
  return user1 < user2
    ? `${user1}_${user2}`
    : `${user2}_${user1}`;
}

io.on('connection', (socket) => {
  console.log("a user connected");


  socket.on("joinRoom", async ({ sellerId }) => {
    console.log(`${sellerId} is joining the group`)

    const chatId = getChatId(socket.user.id, sellerId);

    await socket.join(chatId);

    // send to all
    // io.to(ROOM).emit("roomNotice" , userName);

    // broadcast to all except sender
    socket.to(chatId).emit("roomNotice", {
      userId: socket.user.id,
      message: "joined the chat",
    })
  })

  socket.on("chatMessage", async ({ sellerId, text }) => {
    try {
      const chatId = getChatId(socket.user.id, sellerId);
      const message = await Message.create({
        chatId,
        senderId: socket.user.id,
        receiverId: sellerId,
        text,
      });
      io.to(chatId).emit("chatMessage", message)

    } catch (error) {
      socket.emit("errorMessage", "Message could not be sent");
    }

  })

  // typing event

  // socket.on("typing", ({ userId , name }) => {
  //   const chatId = getChatId(socket.user.id, sellerId);
  //   socket.to(chatId).emit("receiveTyping", { userId , name });
  // });

  // socket.on("stopTyping", ({ senderId }) => {
  //    const chatId = getChatId(socket.user.id, sellerId);
  //   socket.to(chatId).emit("receiveStopTyping", { senderId });
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

})







server.listen(PORT, () => {
  console.log(`Tech Exchange server is running on http://localhost:${PORT}`)
})
