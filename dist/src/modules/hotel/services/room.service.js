"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const repositories_1 = require("../../../shared/repositories");
const facade_1 = require("../../../shared/facade");
const errors_1 = require("../../../shared/errors");
;
let RoomService = class RoomService {
    constructor(hotelRoomRepository, userRepository, database) {
        this.hotelRoomRepository = hotelRoomRepository;
        this.userRepository = userRepository;
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hotel_id, room_type_id, number, status, files } = args;
            let thumbnail = [];
            // organize files to be saved
            if (files === null || files === void 0 ? void 0 : files.length) {
                files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    thumbnail.push({
                        title: file ? file.fieldname : "",
                        key: file ? file.key : ""
                    });
                }));
            }
            const response = yield this.hotelRoomRepository.create({
                number,
                type: yield this.database.convertStringToObjectId(room_type_id),
                status,
                hotel_id: yield this.database.convertStringToObjectId(hotel_id),
                media: thumbnail ? thumbnail : []
            });
            if (!response) {
                throw new errors_1.BadRequestError("room has been created");
            }
            return {
                is_created: true,
            };
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.hotelRoomRepository.fetchAll();
            return {
                rooms: response
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { room_id } = args;
            const response = yield this.hotelRoomRepository.fetchOneById(room_id);
            if (!response) {
                throw new errors_1.BadRequestError("room not found");
            }
            return {
                room: response
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { room_id } = args;
            const response = yield this.hotelRoomRepository.delete(room_id);
            if (!response) {
                throw new errors_1.BadRequestError("failed to delete hotel room");
            }
            return {
                is_deleted: true
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number, room_type_id, status, files, hotel_id } = args;
            const updateRoomType = yield this.hotelRoomRepository.update(hotel_id, {
                number,
                status
            });
            if (!updateRoomType) {
                throw new errors_1.BadRequestError("failed to update room ");
            }
            return {
                is_updated: true
            };
        });
    }
};
RoomService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelRoomRepository,
        repositories_1.UserRepository,
        facade_1.Database])
], RoomService);
exports.default = RoomService;
//# sourceMappingURL=room.service.js.map