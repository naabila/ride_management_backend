import { IDriver } from './driver.interface';
import { Driver } from './driver.model';
import { Ride } from '../ride/ride.model';
import AppError from '../../middlewares/AppError';

export const DriverService = {
  createDriver: async (driverData: IDriver) => {
    const existingDriver = await Driver.findOne({ userId: driverData.userId });
    if (existingDriver) {
      throw new AppError(400,'Driver profile already exists');
    }
    return await Driver.create(driverData);
  },

  updateDriver: async (id: string, data: Partial<IDriver>) => {
    const driver = await Driver.findById(id);
    if (!driver) {
      throw new AppError(404,'Driver not found');
    }
    if (data.isOnline && !driver.isApproved) {
      throw new AppError(400,'Cannot set online: driver not approved');
    }
    return await Driver.findByIdAndUpdate(id, data, { new: true });
  },

  getAvailableDrivers: async () => {
    return await Driver.find({ isOnline: true, isApproved: true, currentRideId: null }).populate('userId', 'name email');
  },

  getDriverEarnings: async (driverId: string) => {
    const driver = await Driver.findOne({ userId: driverId });
    if (!driver) {
      throw new AppError(404,'Driver not found');
    }
    const rides = await Ride.find({ driverId, status: 'completed' });
    const totalEarnings = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    return { rides, totalEarnings };
  },
};