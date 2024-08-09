"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelRoomTypeSchema = new mongoose_1.Schema({
    title: {
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
    discount_amount: {
        type: String,
        required: true,
    },
    hotel_id: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Property",
        required: true
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
exports.default = (0, mongoose_1.model)("HotelRoomType", hotelRoomTypeSchema);
//# sourceMappingURL=hotel_room_type.schema.js.map