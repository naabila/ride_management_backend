import { Schema, model } from 'mongoose';
import { IRide } from './ride.interface';

const rideSchema = new Schema<IRide>(
  {
    rider: { type: String, ref: 'User', required: true },
    driver: { type: String, ref: 'User' },
    pickupLocation: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    destination: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'canceled'],
      default: 'requested',
    },
    fare: { type: Number },
    timestamps: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: { type: Date },
      pickedUpAt: { type: Date },
      completedAt: { type: Date },
      canceledAt: { type: Date },
    },
  },
  { timestamps: true,
    versionKey:false
   }
);

export const Ride = model<IRide>('Ride', rideSchema);