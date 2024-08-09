"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRoomRouter = exports.hotelRoomTypeRouter = void 0;
const room_type_router_1 = __importDefault(require("./room_type.router"));
exports.hotelRoomTypeRouter = room_type_router_1.default;
const room_router_1 = __importDefault(require("./room.router"));
exports.hotelRoomRouter = room_router_1.default;
//# sourceMappingURL=index.js.map