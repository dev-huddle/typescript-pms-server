"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBookingController = exports.HotelOrderController = exports.HotelAmenityMenuController = exports.HotelAmenityController = exports.HotelRoomController = exports.HotelRoomTypeController = void 0;
const amenity_controller_1 = __importDefault(require("./amenity.controller"));
exports.HotelAmenityController = amenity_controller_1.default;
const amenity_menu_controller_1 = __importDefault(require("./amenity_menu.controller"));
exports.HotelAmenityMenuController = amenity_menu_controller_1.default;
const booking_controller_1 = __importDefault(require("./booking.controller"));
exports.HotelBookingController = booking_controller_1.default;
const order_controller_1 = __importDefault(require("./order.controller"));
exports.HotelOrderController = order_controller_1.default;
const room_controller_1 = __importDefault(require("./room.controller"));
exports.HotelRoomController = room_controller_1.default;
const room_type_controller_1 = __importDefault(require("./room_type.controller"));
exports.HotelRoomTypeController = room_type_controller_1.default;
//# sourceMappingURL=index.js.map