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

  //logout
   logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear the jwt cookie
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      sendResponse(res, 200, 'Logout successful', null);
    } catch (error) {
      next(error);
    }
  },
};