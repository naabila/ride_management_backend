import { Schema, model } from 'mongoose';
import { IUser, Role } from './user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum:Object.values(Role),default:Role.rider },
    isBlocked: { type: Boolean, default: false },
    driverDetails: {
      isApproved: { type: Boolean, default: false },
      isOnline: { type: Boolean, default: false },
      vehicleInfo: {
        type: { type: String },
        licensePlate: { type: String },
      },
    },
  },
  { timestamps: true,
     versionKey: false,
   }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model<IUser>('User', userSchema);