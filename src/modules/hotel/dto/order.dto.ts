import { HotelAmenityMenu } from "../../../shared/entities";

export interface CreateHotelOrderInput {
    guest_id: string;
    room_id: string;
    items: HotelAmenityMenu[]
    total_amount: number;
    status: string;
  }
  
  export interface CreateHotelOrderOutput {
    is_created: boolean;
    order_id: string;
  }
  
  export interface FetchAllHotelOrderOutput {
    orders: any[]; // Replace with the actual order type
  }
  
  export interface FetchOneHotelOrderInput {
    order_id: string;
  }
  
  export interface FetchOneHotelOrderOutput {
    order: any; // Replace with the actual order type
  }
  
  export interface UpdateHotelOrderInput {
    order_id: string;
    guest_id?: string;
    room_id?: string;
    items?: HotelAmenityMenu[];
    total_amount?: number;
    status?: string;
  }
  
  export interface UpdateHotelOrderOutput {
    is_updated: boolean;
  }
  
  export interface DeleteHotelOrderInput {
    order_id: string;
  }
  
  export interface DeleteHotelOrderOutput {
    is_deleted: boolean;
  }
  