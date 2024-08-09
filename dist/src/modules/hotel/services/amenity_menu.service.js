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
const errors_1 = require("../../../shared/errors");
const repositories_1 = require("../../../shared/repositories");
const facade_1 = require("../../../shared/facade");
let HotelAmenityMenuService = class HotelAmenityMenuService {
    constructor(hotelAmenityMenuRepository, database) {
        this.hotelAmenityMenuRepository = hotelAmenityMenuRepository;
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amenity_id, name, description, amount, quantity, status, medias } = args;
            let media_files = [];
            // Process media files
            if (medias === null || medias === void 0 ? void 0 : medias.length) {
                medias.map((file) => __awaiter(this, void 0, void 0, function* () {
                    media_files.push({
                        title: file ? file.fieldname : "",
                        key: file ? file.key : "",
                    });
                }));
            }
            const response = yield this.hotelAmenityMenuRepository.create({
                amenity_id: yield this.database.convertStringToObjectId(amenity_id),
                name,
                description,
                amount,
                quantity,
                status: status,
                medias: media_files || [],
            });
            if (!response) {
                throw new errors_1.BadRequestError("Failed to create amenity menu");
            }
            return {
                is_created: true,
            };
        });
    }
    fetchAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amenity_id } = args;
            const response = yield this.hotelAmenityMenuRepository.fetchAllByAmenityId(amenity_id);
            return {
                menus: response,
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { menu_id } = args;
            const response = yield this.hotelAmenityMenuRepository.fetchOneById(menu_id);
            if (!response) {
                throw new errors_1.BadRequestError("Amenity menu not found");
            }
            return {
                menu: response,
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { menu_id, name, description, amount, quantity, status, medias } = args;
            const updateMenu = yield this.hotelAmenityMenuRepository.update(menu_id, {
                name,
                description,
                amount,
                quantity,
                status: status,
                medias,
            });
            if (!updateMenu) {
                throw new errors_1.BadRequestError("Failed to update amenity menu");
            }
            return {
                is_updated: true,
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { menu_id } = args;
            const response = yield this.hotelAmenityMenuRepository.delete(menu_id);
            if (!response) {
                throw new errors_1.BadRequestError("Failed to delete amenity menu");
            }
            return {
                is_deleted: true,
            };
        });
    }
};
HotelAmenityMenuService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelAmenityMenuRepository,
        facade_1.Database])
], HotelAmenityMenuService);
exports.default = HotelAmenityMenuService;
//# sourceMappingURL=amenity_menu.service.js.map