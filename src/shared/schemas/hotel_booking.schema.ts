import { Schema, model } from "mongoose";
import { HotelBooking } from "../entities";
import { HotelBookingStatus } from "../constants";

// Schema for HotelBooking
const hotelBookingSchema: Schema<HotelBooking> = new Schema<HotelBooking>({
  booker_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming a "User" model exists for the booker
  },
  bookee_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming a "User" model exists for the bookee
  },
  hotel_room_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "HotelRoom", // Assuming a "HotelRoom" model exists
  },
  status: {
    type: String,
    enum: Object.values(HotelBookingStatus),
    required: true,
  },
  confirmed_date: {
    type: Date,
  },
  check_in_date: {
    type: Date,
    required: true,
  },
  actual_checking_date: {
    type: Date,
  },
  check_out_date: {
    type: Date,
    required: true,
  },
  actual_checkout_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  updated_at: {
    type: Date,
  },
});

export default model<HotelBooking>("HotelBooking", hotelBookingSchema);
