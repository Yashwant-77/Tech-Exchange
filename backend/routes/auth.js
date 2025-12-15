import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import fetchuser from './fetchuser.js'


// create an express router
const authRouter = express.Router();


// jason web token secret
const JWT_SECRET = process.env.JWT_SECRET || "yashwant_chouhan_secret_key"


// Password strength checker function
function isStrongPassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one digit, and one special character
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
}


// ROUTE 1 : Create a user using POST "/api/auth/createuser" . No login required
authRouter.post('/createuser', [
    // Writing validation 
    body('fullname', "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password")
        .custom((password) => {
            if (!isStrongPassword(password)) {
                throw new Error(
                    "Password should contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character"
                );
            }
            return true; // Must return true if valid
        }),

], async (req, res) => {
    let success = false;

    // If there are errors return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }


    // Check whether the user with this email alredy exists

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({
                success, error: "Sorry a user with this email already exists."
            })
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);


        // Create a new user
        user = await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: secPass
        })

        // Returning json web token to the user
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;

        res.json({ success, authToken });

    } catch (error) {
        res.status(500).send("Some server error occurred")
    }


})



// ROUTE 2 : Authenticate a user using POST "/api/auth/login" . No login required
authRouter.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        // Verifying email and password
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials." })
            }

            // comparing user password with database password
            const passwordCompare = await bcrypt.compare(password, user.password)

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            // Returing jsonwebtoken in return 
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({ success, authToken })

        } catch (error) {
            return res.status(500).send("Internal server error")
        }
    }
)





authRouter.get('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send({ success: true, user });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})



export default authRouter;

