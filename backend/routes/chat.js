import express from 'express';
import fetchuser from './fetchuser.js';
import Message from '../models/Message.js';
import Products from '../models/Products.js';
import mongoose from 'mongoose';

const chatRouter = express.Router();

function getChatId(user1, user2) {
  return user1 < user2
    ? `${user1}_${user2}`
    : `${user2}_${user1}`;
}

// chatRouter.get('/conversations', fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const conversations = await Message.find({
//       $or : [
//         { senderId : userId} , 
//         { receiverId : userId}
//       ]  
//     }).populate("senderId", "fullname email")
//     .populate("receiverId", "fullname email")
//     .sort({ createdAt: -1 });

//     console.log(conversations)

//     res.json({ success: true, conversations });

//   } catch (error) {
//     console.error("Error fetching conversations:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// ======================================================================================

chatRouter.get("/conversations", fetchuser, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const conversations = await Message.aggregate([
      // 1️⃣ Only messages where user is involved
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },

      // 2️⃣ Sort so latest message comes first
      { $sort: { createdAt: -1 } },

      // 3️⃣ Group by "other user" (this makes chat unique)
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$text" },
          lastMessageAt: { $first: "$createdAt" }
        }
      },

      // 4️⃣ Get user details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      { $unwind: "$user" },

      // 5️⃣ Shape response
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          fullname: "$user.fullname",
          email: "$user.email",
          lastMessage: 1,
          lastMessageAt: 1
        }
      },

      // 6️⃣ Latest chats on top
      { $sort: { lastMessageAt: -1 } }
    ]);

    res.json({ success: true, conversations });

  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ success: false });
  }
});



// ======================================================================================
chatRouter.get('/messages/:sellerId', fetchuser, async (req, res) => {
  try {
    const { sellerId } = req.params;
    const userId = req.user.id;
    // console.log("sellerId : " ,sellerId , "userId : ",userId )

    const chatId = getChatId(userId, sellerId);

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


chatRouter.get("/:productId", fetchuser, async (req, res) => {
  const product = await Products.findById(req.params.productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    sellerId: product.sellerId, // OWNER of product
    productId: product._id,
  });
});






export default chatRouter