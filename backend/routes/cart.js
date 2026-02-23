import express from 'express';
import fetchuser from './fetchuser.js';
import {body , validationResult} from 'express-validator';
import User from '../models/User.js';



const cartRouter = express.Router();


cartRouter.post('/',
        fetchuser,
         [
        body("cartItems", "Send valid array").isArray(),
    ],
    async (req, res) => {
        let success = false;
        // console.log('Received req.body:', req.body);
        // console.log('cartItems:', req.body.cartItems);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        // Verifying email and passwordr
        try {
            await User.findByIdAndUpdate(
                 req.user.id,
                { cartItems: req.body.cartItems },
                { new: true });

            success = true;
            res.json({ success, message: "Cart updated successfully" })



        } catch (error) {
            return res.status(500).send("Internal server error")
        }
    }
)



cartRouter.get("/getCartItems", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("cartItems");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartItems: user.cartItems || [],
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});





export default cartRouter;