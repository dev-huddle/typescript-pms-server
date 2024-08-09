import mongoose from "mongoose";
import { Base } from "./base.entity";
import { HotelBookingStatus } from "../constants";

export default interface HotelBooking extends Base {
    booker_id?: mongoose.Types.ObjectId;
    bookee_id: mongoose.Types.ObjectId;
    hotel_room_id: mongoose.Types.ObjectId;
    status: HotelBookingStatus;
    confirmed_date?: Date;
    check_in_date: Date;
    actual_checking_date?: Date;
    check_out_date: Date;
    actual_checkout_date?: Date;
}