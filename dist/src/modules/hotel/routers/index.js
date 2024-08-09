"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelBookingRouter = exports.hotelOrderRouter = exports.hotelAmenityMenuRouter = exports.hotelAmenityRouter = exports.hotelRoomRouter = exports.hotelRoomTypeRouter = void 0;
const room_type_router_1 = __importDefault(require("./room_type.router"));
exports.hotelRoomTypeRouter = room_type_router_1.default;
const room_router_1 = __importDefault(require("./room.router"));
exports.hotelRoomRouter = room_router_1.default;
const hotel_amenity_router_1 = __importDefault(require("./hotel_amenity.router"));
exports.hotelAmenityRouter = hotel_amenity_router_1.default;
const hotel_amenity_menu_router_1 = __importDefault(require("./hotel_amenity_menu.router"));
exports.hotelAmenityMenuRouter = hotel_amenity_menu_router_1.default;
const order_router_1 = __importDefault(require("./order.router"));
exports.hotelOrderRouter = order_router_1.default;
const booking_router_1 = __importDefault(require("./booking.router"));
exports.hotelBookingRouter = booking_router_1.default;
//# sourceMappingURL=index.js.map