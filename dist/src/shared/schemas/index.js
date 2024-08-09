"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelBookingSchema = exports.hotelOrderSchema = exports.hotelAmenitySchema = exports.hotelAmenityMenuSchema = exports.hotelRoomTypeSchema = exports.hotelRoomSchema = exports.filemanagerSchema = exports.subscriptionSchema = exports.planSchema = exports.userSchema = void 0;
const filemanager_schema_1 = __importDefault(require("./filemanager.schema"));
exports.filemanagerSchema = filemanager_schema_1.default;
const plan_schema_1 = __importDefault(require("./plan.schema"));
exports.planSchema = plan_schema_1.default;
const subscription_schema_1 = __importDefault(require("./subscription.schema"));
exports.subscriptionSchema = subscription_schema_1.default;
const user_schema_1 = __importDefault(require("./user.schema"));
exports.userSchema = user_schema_1.default;
const hotel_room_schema_1 = __importDefault(require("./hotel_room.schema"));
exports.hotelRoomSchema = hotel_room_schema_1.default;
const hotel_room_type_schema_1 = __importDefault(require("./hotel_room_type.schema"));
exports.hotelRoomTypeSchema = hotel_room_type_schema_1.default;
const hotel_amenity_menu_schema_1 = __importDefault(require("./hotel_amenity_menu.schema"));
exports.hotelAmenityMenuSchema = hotel_amenity_menu_schema_1.default;
const hotel_amenity_schema_1 = __importDefault(require("./hotel_amenity.schema"));
exports.hotelAmenitySchema = hotel_amenity_schema_1.default;
const hotel_order_schema_1 = __importDefault(require("./hotel_order.schema"));
exports.hotelOrderSchema = hotel_order_schema_1.default;
const hotel_booking_schema_1 = __importDefault(require("./hotel_booking.schema"));
exports.hotelBookingSchema = hotel_booking_schema_1.default;
//# sourceMappingURL=index.js.map