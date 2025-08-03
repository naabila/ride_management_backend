import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';


interface AuthRequest{
  user?: { id: string; role: string };
}

export const checkRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403,'Access denied: insufficient permissions');
    }
    next();
  };
};