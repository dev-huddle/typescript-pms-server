import mongoose from "mongoose";
import { PropertyFileTypes, PropertyTypes } from "../constants";
import { Base } from "./base.entity";

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface PropertyMedia extends Base {
    title: string;
    key: string;
    file_type: PropertyFileTypes
}

export default interface Property extends Base {
  name: string;
  type: PropertyTypes;
  creator_id: mongoose.Types.ObjectId;
  address: PropertyAddress;
  media?: PropertyMedia[]
}
