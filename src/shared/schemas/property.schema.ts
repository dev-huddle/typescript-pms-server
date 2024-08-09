import { Schema, model } from "mongoose";
import { Property } from "../entities";
import { PropertyTypes } from "../constants";

const propertySchema: Schema = new Schema<Property>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [PropertyTypes.HOTEL],
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipcode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
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

export default model<Property>("Property", propertySchema);
