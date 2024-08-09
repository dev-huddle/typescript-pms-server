import { Schema, model } from "mongoose";
import { Property, PropertyMedia } from "../entities";
import { PropertyFileTypes, PropertyTypes } from "../constants";

const propertySchema: Schema = new Schema<Property>({
  name: {
    type: String,
    required: true,
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
  media: [
    new Schema<PropertyMedia>({
      title: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
      file_type: {
        type: String,
        enum: [PropertyFileTypes.PICTURE, PropertyFileTypes.VIDEO],
      },
    }),
  ],
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
