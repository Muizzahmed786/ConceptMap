import { registerUser, loginUser } from "../services/auth.service.js";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

// @desc    User registeration
// @path    /api/register
export const register = async (req, res) => {
    const {username, email, password} = req.body;
    const userData = {username, email, password};
    try{
        const response = await registerUser(userData);
        return res.status(201).json({success: true, data: response});
    } catch(err){
        if(err.message === 'User already exists'){
            return res.status(409).json({success: false, message: err.message});
        }
        return res.status(500).json({success: false, message: err.message});
    }
}

// @desc    User login
// @path    /api/login
export const login = async (req, res) => {
    const {email, password} = req.body;
    const userData = {email, password};
    try{
        const response = await loginUser(userData);
        res.cookie('token', response, COOKIE_OPTIONS);
        return res.status(200).json({success: true, message: 'Logged in successfully'});
    } catch(err){
        if(err.message === 'User not found'){
            return res.status(404).json({success: false, message: err.message});
        }
        if(err.message === 'Invalid password'){
            return res.status(401).json({success: false, message: err.message});
        }
        return res.status(500).json({success: false, message: err.message});
    }
}

// @desc    User logout
// @path    /api/auth/logout
export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}