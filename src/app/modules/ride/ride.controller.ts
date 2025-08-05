import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { RideService } from './ride.services';

// Define the structure of the user object (matches jwt.ts)
interface DecodedToken {
  userId: string;
  role: string;
}

// Extend Request interface
interface AuthRequest extends Request {
  user?: DecodedToken;
}

export const RideController = {
  requestRide: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      const ride = await RideService.requestRide(req.body, req.user.userId);
      sendResponse(res, 201, 'Ride requested successfully', ride);
    } catch (error) {
      next(error);
    }
  },

  updateRideStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      const ride = await RideService.updateRideStatus(
        req.params.id,
        req.body.status,
        req.user
      );
      sendResponse(res, 200, 'Ride status updated successfully', ride);
    } catch (error) {
      next(error);
    }
  },

  getRideHistory: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      const rides = await RideService.getRideHistory(req.user);
      sendResponse(res, 200, 'Ride history retrieved successfully', rides);
    } catch (error) {
      next(error);
    }
  },
};