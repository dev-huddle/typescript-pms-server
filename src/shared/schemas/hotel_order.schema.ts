import { Schema, model } from "mongoose";
import { HotelOrder } from "../entities";
import { HotelOrderStatus } from "../constants";
import { hotelAmenityMenuSchema } from ".";

// Schema for HotelOrder
const hotelOrderSchema: Schema<HotelOrder> = new Schema<HotelOrder>({
  items: [hotelAmenityMenuSchema], // Array of HotelAmenityMenu schemas
  amount: {
    type: String,
    required: true,
  },
  guest_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    enum: Object.values(HotelOrderStatus),
    required: true,
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

export default model<HotelOrder>("HotelOrder", hotelOrderSchema);
