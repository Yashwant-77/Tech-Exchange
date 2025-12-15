import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "yashwant_chouhan_secret_key"
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
   
    if (!token) {
        res.status(401).json({ error: "Please authenticate using valid token" })
        return;
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next();

    } catch (error) {
        console.log("JWT Error:", error);
        res.status(401).json({ error: "Please authenticate using valid token" })
    }
}


export default fetchuser