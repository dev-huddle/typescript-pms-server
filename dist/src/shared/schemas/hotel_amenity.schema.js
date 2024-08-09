"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema for HotelAmenityMedia
const hotelAmenityMediaSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
});
// Schema for HotelAmenity
const hotelAmenitySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hotel_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Property",
    },
    medias: [hotelAmenityMediaSchema],
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
exports.default = (0, mongoose_1.model)("HotelAmenity", hotelAmenitySchema);
//# sourceMappingURL=hotel_amenity.schema.js.map