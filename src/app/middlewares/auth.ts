import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import AppError from './AppError';


export const auth = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new AppError(401,'Unauthorized: No token provided');
      }

      const decoded = verifyToken(token);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole && decoded.role !== 'admin') {
        throw new AppError(403,'Forbidden: Insufficient role permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};