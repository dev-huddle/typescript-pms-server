import mongoose from "mongoose";
import { PropertyTypes } from "../constants";
import { Base } from "./base.entity";

interface PropertyAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export default interface Property extends Base {
    type: PropertyTypes;
    creator: mongoose.Types.ObjectId;
    address: PropertyAddress
}