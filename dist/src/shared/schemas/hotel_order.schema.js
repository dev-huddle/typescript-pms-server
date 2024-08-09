"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const _1 = require(".");
// Schema for HotelOrder
const hotelOrderSchema = new mongoose_1.Schema({
    items: [_1.hotelAmenityMenuSchema], // Array of HotelAmenityMenu schemas
    amount: {
        type: String,
        required: true,
    },
    guest_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        enum: Object.values(constants_1.HotelOrderStatus),
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
exports.default = (0, mongoose_1.model)("HotelOrder", hotelOrderSchema);
//# sourceMappingURL=hotel_order.schema.js.map