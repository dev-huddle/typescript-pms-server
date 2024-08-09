import mongoose from "mongoose";
import { Base } from "./base.entity";
import { HotelRoomStatus } from "../constants";

export interface HotelRoomMedia extends Base {
  title: string;
  key: string;
}

export default interface HotelRoom extends Base {
  hotel_id: mongoose.Types.ObjectId;
  number: string;
  type: mongoose.Types.ObjectId;
  status: HotelRoomStatus;
  media?: HotelRoomMedia[];
}
