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
const errors_1 = require("../../../shared/errors");
const facade_1 = require("../../../shared/facade");
let RoomTypeService = class RoomTypeService {
    constructor(roomTypeRepository, database) {
        this.roomTypeRepository = roomTypeRepository;
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, amount, discount_amount, hotel_id } = args;
            const data = yield this.roomTypeRepository.create({
                title,
                description,
                amount,
                discount_amount: discount_amount ? discount_amount : "",
                hotel_id: yield this.database.convertStringToObjectId(hotel_id),
            });
            if (!data) {
                throw new errors_1.BadRequestError("failed to save room type");
            }
            return {
                is_created: true,
            };
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.roomTypeRepository.fetchAll();
            if (!data) {
                throw new errors_1.BadRequestError("failed to fetch room types");
            }
            return {
                room_types: data,
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { room_type_id } = args;
            const data = yield this.roomTypeRepository.fetchOneById(room_type_id);
            if (!data) {
                throw new errors_1.BadRequestError("failed to fetch property");
            }
            return {
                room_type: data,
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, amount, discount_amount, hotel_id } = args;
            const updateRoomType = yield this.roomTypeRepository.update(hotel_id, {
                title,
                description,
                amount,
                discount_amount,
            });
            if (!updateRoomType) {
                throw new errors_1.BadRequestError("failed to update room type");
            }
            return {
                is_updated: true,
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hotel_room_id } = args;
            const response = yield this.roomTypeRepository.delete(hotel_room_id);
            if (!response) {
                throw new errors_1.BadRequestError("failed to delete hotel room type");
            }
            return {
                is_deleted: true,
            };
        });
    }
};
RoomTypeService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelRoomTypeRepository,
        facade_1.Database])
], RoomTypeService);
exports.default = RoomTypeService;
//# sourceMappingURL=room_type.service.js.map