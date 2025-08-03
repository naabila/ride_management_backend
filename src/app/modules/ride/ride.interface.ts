export interface IRide {
  rider: string;
  driver?: string;
  pickupLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  status: 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';
  fare?: number;
  timestamps: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    canceledAt?: Date;
  };
}