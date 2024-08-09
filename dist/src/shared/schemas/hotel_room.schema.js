"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const hotelRoomSchema = new mongoose_1.Schema({
    hotel_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "HotelRoomType",
        required: true,
    },
    status: {
        type: String,
        enum: [
            constants_1.HotelRoomStatus.AVAILABLE,
            constants_1.HotelRoomStatus.BOOKED,
            constants_1.HotelRoomStatus.MAINTENANCE,
        ],
        required: true,
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
exports.default = (0, mongoose_1.model)("HotelRoom", hotelRoomSchema);
//# sourceMappingURL=hotel_room.schema.js.map