import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { logger } from '../utils/logger';

export const getProfile = async (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    logger.info(`Profile updated: ${user.email}`);
    res.json(user);
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(400).json({ error: 'Bad request' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
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
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};