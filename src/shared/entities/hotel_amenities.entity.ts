import mongoose from "mongoose";
import { Base } from "./base.entity";

export interface HotelAmenityMedia extends Base {
    title: string;
    key: string;
  }

export default interface HotelAmenity extends Base {
    title: string;
    description: string;
    hotel_id: mongoose.Types.ObjectId;
    medias: HotelAmenityMedia[]
}