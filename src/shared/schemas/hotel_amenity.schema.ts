import { Schema, model } from "mongoose";
import { HotelAmenity, HotelAmenityMedia } from "../entities";

// Schema for HotelAmenityMedia
const hotelAmenityMediaSchema: Schema<HotelAmenityMedia> = new Schema<HotelAmenityMedia>({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

// Schema for HotelAmenity
const hotelAmenitySchema: Schema<HotelAmenity> = new Schema<HotelAmenity>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hotel_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Property", 
  },
  medias: [hotelAmenityMediaSchema],
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

export default model<HotelAmenity>("HotelAmenity", hotelAmenitySchema);
