import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message: 'Unauthorized: no token provided'
            });
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch(err){
        return res.status(401).json({message: 'Unauthorized: Invalid or expored token'});
    }
}