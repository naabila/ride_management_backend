import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

export const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.register(req.body);
      sendResponse(res, 201, 'User registered successfully', user);
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      sendResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
      next(error);
    }
  },

  blockUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.blockUser(req.params.id);
      sendResponse(res, 200, 'User blocked successfully', user);
    } catch (error) {
      next(error);
    }
  },
};