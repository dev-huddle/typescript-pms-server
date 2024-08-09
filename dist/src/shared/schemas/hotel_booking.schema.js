"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
// Schema for HotelBooking
const hotelBookingSchema = new mongoose_1.Schema({
    booker_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", // Assuming a "User" model exists for the booker
    },
    bookee_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming a "User" model exists for the bookee
    },
    hotel_room_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "HotelRoom", // Assuming a "HotelRoom" model exists
    },
    status: {
        type: String,
        enum: Object.values(constants_1.HotelBookingStatus),
        required: true,
    },
    confirmed_date: {
        type: Date,
    },
    check_in_date: {
        type: Date,
        required: true,
    },
    actual_checking_date: {
        type: Date,
    },
    check_out_date: {
        type: Date,
        required: true,
    },
    actual_checkout_date: {
        type: Date,
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
exports.default = (0, mongoose_1.model)("HotelBooking", hotelBookingSchema);
//# sourceMappingURL=hotel_booking.schema.js.map