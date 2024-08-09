export interface CreateHotelAmenityMenuInput {
    amenity_id: string;
    name: string;
    description: string;
    amount: string;
    quantity: string;
    status: string;
    medias?: any
  }
  
  export interface CreateHotelAmenityMenuOutput {
    is_created: boolean;
  }
  
  export interface FetchAllHotelAmenityMenuInput {
    amenity_id: string;
  }
  
  export interface FetchAllHotelAmenityMenuOutput {
    menus: any[]; // Replace with the actual menu type
  }
  
  export interface FetchOneHotelAmenityMenuInput {
    menu_id: string;
  }
  
  export interface FetchOneHotelAmenityMenuOutput {
    menu: any; // Replace with the actual menu type
  }
  
  export interface UpdateHotelAmenityMenuInput {
    menu_id: string;
    name?: string;
    description?: string;
    amount?: string;
    quantity?: string;
    status?: string;
    medias?: {
      title: string;
      key: string;
    }[];
  }
  
  export interface UpdateHotelAmenityMenuOutput {
    is_updated: boolean;
  }
  
  export interface DeleteHotelAmenityMenuInput {
    menu_id: string;
  }
  
  export interface DeleteHotelAmenityMenuOutput {
    is_deleted: boolean;
  }
  