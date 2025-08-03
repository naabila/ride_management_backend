import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { RideService } from './ride.services';

export const RideController = {
  requestRide: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ride = await RideService.requestRide(req.body, req.user.userId);
      sendResponse(res, 201, 'Ride requested successfully', ride);
    } catch (error) {
      next(error);
    }
  },

  updateRideStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
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

  getRideHistory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rides = await RideService.getRideHistory(req.user);
      sendResponse(res, 200, 'Ride history retrieved successfully', rides);
    } catch (error) {
      next(error);
    }
  },
};