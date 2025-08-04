
export interface IDriver {
  userId: string; 
  isApproved: boolean; 
  isOnline: boolean;
  isSuspended: boolean; 
  suspendedBy?: string; 
  suspendedAt?: Date;
  suspensionReason?: string;
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
