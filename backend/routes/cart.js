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




export default cartRouter;