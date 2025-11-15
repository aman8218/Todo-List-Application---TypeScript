import { Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { sendEmail } from '../utils/email';

// Generate JWT Token
const generateToken = (id: string): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
        { id },
        secret,
        { expiresIn: '7d' }
    );
};

// @desc    Register user
// @route   POST /api/auth/signup
export const signup = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({
                success: false,
                message: 'User already exists',
            });
            return;
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error in signup',
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/signin
export const signin = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
            return;
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error in signin',
        });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expire time (10 minutes)
        user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link to reset your password:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message,
            });

            res.status(200).json({
                success: true,
                message: 'Email sent successfully',
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: 'Email could not be sent',
            });
            return;
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error in forgot password',
        });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
export const resetPassword = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { password } = req.body;

        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: 'Invalid or expired token',
            });
            return;
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            token,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error in reset password',
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id);

        res.status(200).json({
            success: true,
            user: {
                id: user?._id.toString(),
                name: user?.name,
                email: user?.email,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error getting user',
        });
    }
};