export interface Property {
  propertyId?: number;
  userId?: number;
  nTitle: string;
  description: string;
  direction: string;
  availability: string;
  type: string;
  capacity: number;
  state: string;
  features: string;
  cost?: number;
  city: string;
  rooms: string;
}