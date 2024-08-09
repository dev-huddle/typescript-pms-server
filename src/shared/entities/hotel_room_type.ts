import mongoose from "mongoose";
import { Base } from "./base.entity";

export default interface HotelRoomType extends Base {
  title: string;
  description: string;
  amount: string;
  discount_amount: string;
  hotel_id: mongoose.Types.ObjectId;
}
