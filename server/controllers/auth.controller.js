import { registerUser, loginUser, refreshAccessTokenService, clearUserRefreshToken } from "../services/auth.service.js";
import jwt from 'jsonwebtoken';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
};

// @desc    User registeration
// @path    /api/register
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const userData = { username, email, password };
    try {
        const response = await registerUser(userData);
        return res.status(201).json({ success: true, data: response });
    } catch (err) {
        if (err.message === 'User already exists') {
            return res.status(409).json({ success: false, message: err.message });
        }
        return res.status(500).json({ success: false, message: err.message });
    }
}

// @desc    User login
// @path    /api/login
export const login = async (req, res) => {
    const { email, password } = req.body;
    const userData = { email, password };
    try {
        const response = await loginUser(userData);
        res.cookie('accessToken', response.accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', response.refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, message: 'Logged in successfully' });
    } catch (err) {
        if (err.message === 'User not found') {
            return res.status(404).json({ success: false, message: err.message });
        }
        if (err.message === 'Invalid password') {
            return res.status(401).json({ success: false, message: err.message });
        }
        return res.status(500).json({ success: false, message: err.message });
    }
}

// @desc    User logout
// @path    /api/auth/logout
export const logout = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
        try {
            const decoded = jwt.decode(refreshToken);
            if (decoded?.userId) {
                await clearUserRefreshToken(decoded.userId);
            }
        } catch (e) {

        }
    }
    res.clearCookie('accessToken', COOKIE_OPTIONS);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    return res.status(200).json({
        success: true, 
        message: 'Logged out successfully' 
    });
}


// @desc    Refresh the access token
// @path    /api/auth/jwt/refresh
export const refresh = async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;
    try {
        const { accessToken, refreshToken } = await refreshAccessTokenService(incomingRefreshToken);
        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'Token refreshed'
        });
    } catch (err) {
        res.clearCookie('accessToken', COOKIE_OPTIONS);
        res.clearCookie('refreshToken', COOKIE_OPTIONS);
        return res.status(401).json({
            success: false,
            message: 'Sesion expired, Please log in again.'
        });
    }
}