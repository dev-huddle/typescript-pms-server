import mongoose from "mongoose";
import { Base } from "./base.entity";
import { HotelAmenityStatus } from "../constants";

export interface HotelAmenityMenuMedia extends Base {
    title: string;
    key: string;
}

export interface HotelAmenityMenu extends Base {
    amenity_id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    amount: string;
    quantity: string;
    status: HotelAmenityStatus
    medias: HotelAmenityMenuMedia[]
}