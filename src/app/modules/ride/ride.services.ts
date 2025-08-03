import { IRide } from './ride.interface';
import { Ride } from './ride.model';
import { User } from '../user/user.model';
import AppError from '../../middlewares/AppError';


export const RideService = {
  requestRide: async (data: Partial<IRide>, riderId: string) => {
    const rider = await User.findById(riderId);
    if (!rider || rider.isBlocked) {
      throw new AppError(403,'Rider account is blocked or not found');
    }

    const activeRide = await Ride.findOne({
      rider: riderId,
      status: { $in: ['requested', 'accepted', 'picked_up', 'in_transit'] },
    });
    if (activeRide) {
      throw new AppError(400,'Rider already has an active ride');
    }

    return await Ride.create({ ...data, rider: riderId });
  },

  updateRideStatus: async (rideId: string, status: string, user: { userId: string; role: string }) => {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      throw new AppError(404,'Ride not found');
    }

    if (ride.status === 'completed' || ride.status === 'canceled') {
      throw new AppError(400,'Cannot update completed or canceled ride');
    }

    if (user.role === 'rider' && status !== 'canceled') {
      throw new AppError(403,'Riders can only cancel rides');
    }

    if (user.role === 'driver') {
      const driver = await User.findById(user.userId);
      if (!driver || !driver.driverDetails?.isApproved || !driver.driverDetails?.isOnline) {
        throw new AppError(403,'Driver is not approved or offline');
      }
      if (status === 'accepted') {
        ride.driver = user.userId;
        ride.timestamps.acceptedAt = new Date();
      }
    }

    ride.status = status as any;
    if (status === 'picked_up') ride.timestamps.pickedUpAt = new Date();
    if (status === 'completed') ride.timestamps.completedAt = new Date();
    if (status === 'canceled') ride.timestamps.canceledAt = new Date();

    return await ride.save();
  },

  getRideHistory: async (user: { userId: string; role: string }) => {
    if (user.role === 'admin') {
      return await Ride.find().populate('rider driver');
    }
    return await Ride.find({
      $or: [{ rider: user.userId }, { driver: user.userId }],
    }).populate('rider driver');
  },
};