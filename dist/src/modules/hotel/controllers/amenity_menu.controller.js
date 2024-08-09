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
const helper_1 = require("../../../shared/helper");
const constants_1 = require("../../../shared/constants");
const services_1 = require("../services");
let HotelAmenityMenuController = class HotelAmenityMenuController {
    constructor(hotelAmenityMenuService) {
        this.hotelAmenityMenuService = hotelAmenityMenuService;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amenity_id, name, description, amount, quantity, status } = req.body;
                const { files } = req;
                const response = yield this.hotelAmenityMenuService.create({
                    amenity_id,
                    name,
                    description,
                    amount,
                    quantity,
                    status,
                    medias: files,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "Successfully created amenity menu",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    fetchAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amenity_id } = req.query;
                const response = yield this.hotelAmenityMenuService.fetchAll({ amenity_id: String(amenity_id) });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched all amenity menus",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    fetchOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.hotelAmenityMenuService.fetchOne({ menu_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched amenity menu",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.hotelAmenityMenuService.update(Object.assign({ menu_id: id }, req.body));
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully updated amenity menu",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.hotelAmenityMenuService.delete({ menu_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "Successfully deleted amenity menu",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
HotelAmenityMenuController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.HotelAmenityMenuService])
], HotelAmenityMenuController);
exports.default = HotelAmenityMenuController;
//# sourceMappingURL=amenity_menu.controller.js.map