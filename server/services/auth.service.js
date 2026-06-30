import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        return token;

    } catch(err){
        throw err;
    }
}