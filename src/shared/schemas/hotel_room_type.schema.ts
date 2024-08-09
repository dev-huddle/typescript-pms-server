import { Schema, model } from "mongoose";
import { HotelRoomType } from "../entities";

const hotelRoomTypeSchema: Schema = new Schema<HotelRoomType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  discount_amount: {
    type: String,
    required: true,
  },
  hotel_id: {
    type: Schema.ObjectId,
    ref: "Property",
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

export default model<HotelRoomType>("HotelRoomType", hotelRoomTypeSchema);
