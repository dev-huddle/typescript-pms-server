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
const facade_1 = require("../../../shared/facade");
const repositories_1 = require("../../../shared/repositories");
let HotelAmenityService = class HotelAmenityService {
    constructor(amenityRepository, database) {
        this.amenityRepository = amenityRepository;
        this.database = database;
    }
    // Create a new hotel amenity
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, hotel_id, files } = args;
            let medias = [];
            // Process media files
            if (files === null || files === void 0 ? void 0 : files.length) {
                files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    medias.push({
                        title: file ? file.fieldname : "",
                        key: file ? file.key : "",
                    });
                }));
            }
            // Create the hotel amenity
            const data = yield this.amenityRepository.create({
                title,
                description,
                hotel_id: yield this.database.convertStringToObjectId(hotel_id),
                medias: medias.length ? medias : [],
            });
            if (!data) {
                throw new errors_1.BadRequestError("Failed to save hotel amenity");
            }
            return {
                is_created: true,
            };
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.amenityRepository.fetchAll();
            if (!data) {
                throw new errors_1.BadRequestError("Failed to fetch hotel amenities");
            }
            return {
                amenities: data,
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amenity_id } = args;
            const data = yield this.amenityRepository.fetchOneById(amenity_id);
            if (!data) {
                throw new errors_1.BadRequestError("Failed to fetch hotel amenity");
            }
            return {
                amenity: data,
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, files, amenity_id } = args;
            let medias = [];
            if (files === null || files === void 0 ? void 0 : files.length) {
                files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    medias.push({
                        title: file ? file.fieldname : "",
                        key: file ? file.key : "",
                    });
                }));
            }
            const updatedAmenity = yield this.amenityRepository.update(amenity_id, {
                title,
                description,
                medias: medias.length ? medias : [],
            });
            if (!updatedAmenity) {
                throw new errors_1.BadRequestError("Failed to update hotel amenity");
            }
            return {
                is_updated: true,
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amenity_id } = args;
            const response = yield this.amenityRepository.delete(amenity_id);
            if (!response) {
                throw new errors_1.BadRequestError("Failed to delete hotel amenity");
            }
            return {
                is_deleted: true,
            };
        });
    }
};
HotelAmenityService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelAmenityRepository,
        facade_1.Database])
], HotelAmenityService);
exports.default = HotelAmenityService;
//# sourceMappingURL=amenity.service.js.map