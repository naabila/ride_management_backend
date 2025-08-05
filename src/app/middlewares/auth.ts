import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Define the expected user structure
export interface DecodedToken {
  userId: string;
  role: string;
}

// Extend Express Request type
interface AuthRequest extends Request {
  user?: DecodedToken;
}

export const auth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('No token provided');
      }
      const decoded = verifyToken(token);
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};