"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBookingService = exports.HotelOrderService = exports.HotelAmenityMenuService = exports.HotelAmenityService = exports.RoomService = exports.RoomTypeService = void 0;
const amenity_service_1 = __importDefault(require("./amenity.service"));
exports.HotelAmenityService = amenity_service_1.default;
const amenity_menu_service_1 = __importDefault(require("./amenity_menu.service"));
exports.HotelAmenityMenuService = amenity_menu_service_1.default;
const booking_service_1 = __importDefault(require("./booking.service"));
exports.HotelBookingService = booking_service_1.default;
const order_service_1 = __importDefault(require("./order.service"));
exports.HotelOrderService = order_service_1.default;
const room_service_1 = __importDefault(require("./room.service"));
exports.RoomService = room_service_1.default;
const room_type_service_1 = __importDefault(require("./room_type.service"));
exports.RoomTypeService = room_type_service_1.default;
//# sourceMappingURL=index.js.map