"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomTypeRepository = exports.HotelRoomRepository = exports.PropertyRepository = exports.FileManagerRepository = exports.FolderRepository = exports.FileRepository = exports.SubscriptionRepository = exports.PlanRepository = exports.UserRepository = void 0;
const file_repository_1 = __importDefault(require("./file.repository"));
exports.FileRepository = file_repository_1.default;
const filemanager_repository_1 = __importDefault(require("./filemanager.repository"));
exports.FileManagerRepository = filemanager_repository_1.default;
const folder_repository_1 = __importDefault(require("./folder.repository"));
exports.FolderRepository = folder_repository_1.default;
const hotel_room_repository_1 = __importDefault(require("./hotel_room.repository"));
exports.HotelRoomRepository = hotel_room_repository_1.default;
const hotel_room_type_repository_1 = __importDefault(require("./hotel_room_type.repository"));
exports.HotelRoomTypeRepository = hotel_room_type_repository_1.default;
const plan_repository_1 = __importDefault(require("./plan.repository"));
exports.PlanRepository = plan_repository_1.default;
const property_repository_1 = __importDefault(require("./property.repository"));
exports.PropertyRepository = property_repository_1.default;
const subscription_repository_1 = __importDefault(require("./subscription.repository"));
exports.SubscriptionRepository = subscription_repository_1.default;
const user_repository_1 = __importDefault(require("./user.repository"));
exports.UserRepository = user_repository_1.default;
//# sourceMappingURL=index.js.map