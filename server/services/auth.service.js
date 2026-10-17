import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
}

export const registerUser = async (userData) => {
    try{
        const existingUser = await User.findOne({email: userData.email});
        if(existingUser){
            throw new Error('User already exists');
        }

        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        const user = new User ({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        return savedUser;
    } catch(err){
        console.error(`Error registering user : ${err}`);
        throw err;
    }
}

// Verify refresh token and issue a new access token
export const refreshAccessTokenService = async (incomingRefreshToken) => {
    if(!incomingRefreshToken){
        throw new Error('No refresh token provided');
    }

    const payload = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if(!user || user.refreshToken !== incomingRefreshToken){
        throw new Error('Invalid or revoked refresh token');
    }

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    return tokens;
}

export const clearUserRefreshToken = async (userId) => {
    if(userId){
        await User.findByIdAndUpdate(userId, {
            refreshToken: null
        });
    }
};

export const loginUser = async (userData) => {
    try{
        const user = await User.findOne({email: userData.email});
        if(!user){
            throw new Error('User not found');
        }
        const passwordMatch = await bcryptjs.compare(userData.password, user.password); // userData -> entered by user, user -> stored in db
        if(!passwordMatch){
            throw new Error('Invalid password');
        }

        const {accessToken, refreshToken} = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        return {accessToken, refreshToken};

    } catch(err){
        throw err;
    }
}