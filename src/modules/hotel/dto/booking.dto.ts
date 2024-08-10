export interface CreateHotelBookingInput {
    guest_id: string;
    room_id: string;
    check_in_date: Date;
    check_out_date: Date;
    amount: string;
  }
  
  export interface CreateHotelBookingOutput {
    is_created: boolean;
    booking_id: string;
  }
  
  export interface FetchAllHotelBookingOutput {
    bookings: any[]; // Replace with the actual booking type
  }
  
  export interface FetchOneHotelBookingInput {
    booking_id: string;
  }
  
  export interface FetchOneHotelBookingOutput {
    booking: any; // Replace with the actual booking type
  }
  
  export interface UpdateHotelBookingInput {
    booking_id: string;
    guest_id?: string;
    room_id?: string;
    check_in_date?: Date;
    check_out_date?: Date;
    status?: string;
    amount_paid?: number;
  }
  
  export interface UpdateHotelBookingOutput {
    is_updated: boolean;
  }
  
  export interface DeleteHotelBookingInput {
    booking_id: string;
  }
  
  export interface DeleteHotelBookingOutput {
    is_deleted: boolean;
  }

  export interface CancelHotelBookingInput {
    booking_id: string;
  }

  export interface CancelHotelBookingOutput {
    is_canceled: boolean;
  }
  