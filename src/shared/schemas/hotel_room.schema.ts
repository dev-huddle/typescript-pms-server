import { Schema, model } from "mongoose";
import { HotelRoom } from "../entities";
import { HotelRoomStatus } from "../constants";

const hotelRoomSchema: Schema = new Schema<HotelRoom>({
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "HotelRoomType",
    required: true,
  },
  status: {
    type: String,
    enum: [
      HotelRoomStatus.AVAILABLE,
      HotelRoomStatus.BOOKED,
      HotelRoomStatus.MAINTENANCE,
    ],
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

export default model<HotelRoom>("HotelRoom", hotelRoomSchema);
