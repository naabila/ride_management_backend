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

     // Prevent suspended drivers from going online
    if (data.isOnline && driver.isSuspended) {
      throw new AppError(403, 'Cannot set online: driver is suspended');
    }
    if (data.isOnline && !driver.isApproved) {
      throw new AppError(400,'Cannot set online: driver not approved');
    }
    return await Driver.findByIdAndUpdate(id, data, { new: true });
  },

  // Suspend Driver Method
  suspendDriver: async (driverId: string, adminId: string, reason?: string) => {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new AppError(404, 'Driver not found');
    }

    if (driver.isSuspended) {
      throw new AppError(400, 'Driver is already suspended');
    }

    // If driver is currently online, set them offline
    const updateData: Partial<IDriver> = {
      isSuspended: true,
      isOnline: false, // Force offline when suspended
      suspendedBy: adminId,
      suspendedAt: new Date(),
      suspensionReason: reason || 'No reason provided'
    };

    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, { new: true });
    
    // Cancel any active rides for this driver
    await Ride.updateMany(
      { 
        driver: driver.userId, 
        status: { $in: ['accepted', 'picked_up', 'in_transit'] } 
      },
      { 
        status: 'canceled',
        'timestamps.canceledAt': new Date()
      }
    );

    return updatedDriver;
  },

  //Unsuspend Driver Method
  unsuspendDriver: async (driverId: string) => {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new AppError(404, 'Driver not found');
    }

    if (!driver.isSuspended) {
      throw new AppError(400, 'Driver is not suspended');
    }

    const updateData: Partial<IDriver> = {
      isSuspended: false,
      suspendedBy: undefined,
      suspendedAt: undefined,
      suspensionReason: undefined
    };

    return await Driver.findByIdAndUpdate(driverId, updateData, { new: true });
  },

  getAvailableDrivers: async () => {
    return await Driver.find({ isOnline: true, isApproved: true,isSuspended: false,currentRideId: null }).populate('userId', 'name email');
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