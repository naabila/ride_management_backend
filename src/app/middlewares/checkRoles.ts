import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from './auth'; 

export const checkRole = (roles: string[]) => {
  return (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};