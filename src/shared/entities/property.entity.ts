import mongoose from "mongoose";
import { PropertyTypes } from "../constants";
import { Base } from "./base.entity";

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export default interface Property extends Base {
  name: string;
  type: PropertyTypes;
  creator_id: mongoose.Types.ObjectId;
  address: PropertyAddress;
}
