

const socketHandler = (io) => {

    const onlineUsers = new Map();


    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        const token = socket.handshake.auth.token;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.user.id;   // ✅ bind user to socket
            onlineUsers.set(socket.userId, socket.id);
        } catch {
            socket.disconnect();
        }

        socket.on("joinRoom", ({ otherUserId }) => {
            if (!socket.userId) return;
            const roomId = [socket.userId, otherUserId].sort().join('_');
            socket.join(roomId);
        });


        socket.on("userTyping", ({ otherUserId }) => {
            const roomId = [socket.userId, otherUserId].sort().join('_');
            socket.to(roomId).emit("typing");
        });

        socket.on("userStopTyping", ({ otherUserId }) => {
            const roomId = [socket.userId, otherUserId].sort().join('_')
            socket.to(roomId).emit("stopTyping");
        });


        socket.on("sendMessage", async ({ receiverId, message }) => {
            if (!socket.userId) return;

            // Save to DB
            const newMessage = new Chat({
                senderId: socket.userId,
                receiverId,
                message,
            });
            await newMessage.save();

            // Emit to room
            const room = [socket.userId, receiverId].sort().join('_');
            io.to(room).emit("receiveMessage", newMessage);
        });

        socket.on("checkOnlineStatus", ({ otherUserId }) => {
            const isOnline = onlineUsers.has(otherUserId);
            socket.emit("onlineStatus", { isOnline });
        });

        socket.on("disconnect", () => {
            onlineUsers.delete(socket.userId);
            console.log("Socket disconnected:", socket.id);
        });
    });
}

export default socketHandler