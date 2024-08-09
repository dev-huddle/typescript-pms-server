import mongoose from "mongoose";
import { Base } from "./base.entity";
import { HotelAmenityMenu } from "./hotel_amenities_menu.entity";
import { HotelOrderStatus } from "../constants";

export interface HotelOrder extends Base {
    items: HotelAmenityMenu[];
    amount: string;
    guest_id: mongoose.Types.ObjectId;
    status: HotelOrderStatus
}