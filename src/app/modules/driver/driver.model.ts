import { Schema, model } from 'mongoose';
import { IDriver } from './driver.interface';

const driverSchema = new Schema<IDriver>(
  {
    userId: { type: String, required: true, unique: true },
    isApproved: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false }, 
    suspendedBy: { type: String }, 
    suspendedAt: { type: Date }, 
    suspensionReason: { type: String }, 
    vehicleInfo: {
      type: { type: String, required: true },
      licensePlate: { type: String, required: true },
      model: { type: String },
      color: { type: String },
    },
    currentRideId: { type: String },
  },
  { timestamps: true,
    versionKey:false
   },
);

export const Driver = model<IDriver>('Driver', driverSchema);