import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

export const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.cookie('accessToken',token,{
        httpOnly:true,
        secure:false
      })
      res.setHeader('Authorization', `Bearer ${token}`);
      sendResponse(res, 200, 'Login successful', { user, token });
    } catch (error) {
      next(error);
    }
  },
};