import { Schema, model } from "mongoose";
import { HotelAmenityMenu, HotelAmenityMenuMedia } from "../entities";
import { HotelAmenityStatus } from "../constants";

// Schema for HotelAmenityMenuMedia
const hotelAmenityMenuMediaSchema: Schema<HotelAmenityMenuMedia> = new Schema<HotelAmenityMenuMedia>({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

// Schema for HotelAmenityMenu
const hotelAmenityMenuSchema: Schema<HotelAmenityMenu> = new Schema<HotelAmenityMenu>({
  amenity_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "HotelAmenity", 
  },
  name: {
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
  quantity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(HotelAmenityStatus),
    required: true,
  },
  medias: [hotelAmenityMenuMediaSchema],
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

export default model<HotelAmenityMenu>("HotelAmenityMenu", hotelAmenityMenuSchema);
