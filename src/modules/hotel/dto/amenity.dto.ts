import { FileArray } from "express-fileupload";
import { HotelAmenity } from "../../../shared/entities";

export interface CreateHotelAmenityInput {
    title: string;
    description: string;
    hotel_id: string; 
    files?: any;   // Array of media files (optional)
}

export interface CreateHotelAmenityOutput {
is_created: boolean;
}

export interface FetchAllHotelAmenityOutput {
  amenities: HotelAmenity[]; // Array of HotelAmenity objects
}

export interface FetchOneHotelAmenityInput {
    amenity_id: string; // Amenity ID passed as a string
}

export interface FetchOneHotelAmenityOutput {
  amenity: HotelAmenity; // Single HotelAmenity object
}

export interface UpdateHotelAmenityInput {
    amenity_id: string; // Amenity ID
    title?: string;     // Updated title (optional)
    description?: string;  // Updated description (optional)
    files?: File[];     // Updated array of media files (optional)
}

export interface UpdateHotelAmenityOutput {
    is_updated: boolean;
}

export interface DeleteHotelAmenityInput {
    amenity_id: string; // Amenity ID passed as a string
}

export interface DeleteHotelAmenityOutput {
    is_deleted: boolean;
}
  
  
  
  

  

  
  