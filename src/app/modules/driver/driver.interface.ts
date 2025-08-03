


export interface IDriver {
  userId: string; 
  isApproved: boolean; 
  isOnline: boolean;
  vehicleInfo: {
    type: string; 
    licensePlate: string; 
    model?: string; 
    color?: string; 
  };
  currentRideId?: string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}
