import { Request, Response, NextFunction } from 'express';
import { z } from 'zod'; 
import AppError from './AppError';

// Use z.ZodType for generic schema validation
export const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      next();
    } catch (error) {
      next(new AppError(400, 'Validation failed: ' + (error as any).message));
    }
  };
};