import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const [_, token] = authHeader.split(" ");
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch(err){
        return res.status(401).json({message: 'Unauthorized'});
    }
}