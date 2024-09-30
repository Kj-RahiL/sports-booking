import { Model } from 'mongoose';

export type TFacility = {
  name: string;
  image: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

// export interface FacilityModel extends Model<TFacility> {
//     isUserExists(id: string): Promise<TFacility | null>;
//   }
