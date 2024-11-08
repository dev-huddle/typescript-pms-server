import { HotelBooking } from "../../../shared/entities";

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
  bookings: HotelBooking[]; 
}

export interface FetchOneHotelBookingInput {
  booking_id: string;
}

export interface FetchOneHotelBookingOutput {
  booking: HotelBooking;
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

export interface ChangeDateHotelBookingInput {
  booking_id: string;
  check_in_date?: Date;
  check_out_date?: Date;
}

export interface ChangeDateHotelBookingOutput {
  is_changed: boolean;
}

export interface ChangeRoomHotelBookingInput {
  booking_id: string;
  room_id: string;
}

export interface ChangeRoomHotelBookingOutput {
  is_changed: boolean;
}

export interface CheckInHotelBookingInput {
  booking_id: string;
}

export interface CheckInHotelBookingOutput {
  is_check_in: boolean;
}

export interface CheckOutHotelBookingInput {
  booking_id: string;
}

export interface CheckOutHotelBookingOutput {
  is_check_out: boolean;
}
