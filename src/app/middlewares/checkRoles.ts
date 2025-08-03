import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';


export const checkRole = (roles: string[]) => {
  return (req: Request,res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      throw new AppError(403, 'Forbidden: Insufficient permissions');
    }
    next();
  };
};