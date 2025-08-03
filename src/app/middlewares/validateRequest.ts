import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import AppError from './AppError';


export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      next();
    } catch (error) {
      next(new AppError(400,'Validation failed: ' + (error as any).message));
    }
  };
};