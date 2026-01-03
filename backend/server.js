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
import {Server} from 'socket.io'

// env Configurations
dotenv.config();

// Initializations
const app = express();
const PORT = process.env.PORT || 5000;
const  JWT_SECRET = process.env.JWT_SECRET

// Connect to Database
connectToMongoDB();



// Allow frontend to access backend APIs
app.use(cors({ origin: "http://localhost:5173" }))



// Middlewares to use json data in request body
app.use(express.json());

// Routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


const server = http.createServer(app)


// const io = new Server(server , {
//     cors: {
//     origin: "*", // frontend URL in production
//     methods: ["GET", "POST"],
//   },
// })

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;

//   if (!token) {
//     return next(new Error("Authentication error: Token missing"));
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET); // use env in real app
//     socket.userId = decoded.id; // attach user ID
//     next();
//   } catch (err) {
//     next(new Error("Authentication error: Invalid token"));
//   }
// });


// function getRoomId(userId , otherUserId){
//     return [userId.userId, otherUserId]
//       .sort()
//       .join("_");
// }


// io.on("connection", (socket) => {
//   // Join room
//   socket.on("joinRoom", ({ otherUserId }) => {
//     if(otherUserId === socket.userId) return;
//     const roomId = getRoomId(socket.userId , otherUserId)

//     socket.join(roomId);
//   });

//   // Send message
//   socket.on("sendMessage", ({ otherUserId , message }) => {
//     const roomId = getRoomId(socket.userId , otherUserId)

//     io.to(roomId).emit("receiveMessage", {
//       senderId: socket.userId,
//       message,
//     });
//   });

//   // Typing indicator
//   socket.on("typing", ({otherUserId}) => {
//     const roomId = getRoomId(socket.userId , otherUserId)
//     socket.to(roomId).emit("userTyping", socket.userId);
//   });

//   socket.on("stopTyping", ({otherUserId}) => {
//     const roomId = getRoomId(socket.userId , otherUserId)
//     socket.to(roomId).emit("stopTyping", socket.userId);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.userId);
//   });
// });





server.listen(PORT, () => {
    console.log(`Tech Exchange server is running on http://localhost:${PORT}`)
})