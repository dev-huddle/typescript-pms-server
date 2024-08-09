"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
// Schema for HotelAmenityMenuMedia
const hotelAmenityMenuMediaSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
});
// Schema for HotelAmenityMenu
const hotelAmenityMenuSchema = new mongoose_1.Schema({
    amenity_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "HotelAmenity",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(constants_1.HotelAmenityStatus),
        required: true,
    },
    medias: [hotelAmenityMenuMediaSchema],
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
exports.default = (0, mongoose_1.model)("HotelAmenityMenu", hotelAmenityMenuSchema);
//# sourceMappingURL=hotel_amenity_menu.schema.js.map