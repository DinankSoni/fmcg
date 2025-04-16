import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import { logger } from '../utils/logger';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Return the current user's profile
    res.json(req.user);
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    // Find the user by ID and update fields if provided
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save(); // Triggers pre('save') to update `updatedAt`

    logger.info(`Profile updated: ${user.email}`);
    res.json(user);
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(400).json({ error: 'Bad request' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    logger.info(`Profile deleted: ${user.email}`);
    res.json({ message: 'User deleted' });
  } catch (error) {
    logger.error('Delete profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Return all users (excluding password)
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
