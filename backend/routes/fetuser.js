import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "yashwant_chouhan_secret_key"
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log("JWT_SECRET in fetchuser:", JSON.stringify(JWT_SECRET));
console.log("process.env.JWT_SECRET:", JSON.stringify(process.env.JWT_SECRET));
    // console.log(token);
    if (!token) {
        res.status(401).json({ error: "Please authenticate using valid token" })
        return;
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)
        console.log(data);
        req.user = data.user
        next();

    } catch (error) {
        console.log("JWT Error:", error);
        res.status(401).json({ error: "Please authenticate using valid token" })
    }
}


export default fetchuser