
export enum Role {
  rider = "rider",
  driver = "driver",
  admin = "admin",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isBlocked?: boolean;
  driverDetails?: {
    isApproved?: boolean;
    isOnline?: boolean;
    vehicleInfo?: {
      type: string;
      licensePlate: string;
    };
  };
}