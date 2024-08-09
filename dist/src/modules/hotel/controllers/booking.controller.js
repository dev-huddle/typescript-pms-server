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
let HotelBookingController = class HotelBookingController {
    constructor(hotelBookingService) {
        this.hotelBookingService = hotelBookingService;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { guest_id, room_id, check_in_date, check_out_date, status, amount } = req.body;
                const response = yield this.hotelBookingService.create({
                    guest_id,
                    room_id,
                    check_in_date,
                    check_out_date,
                    status,
                    amount,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "Successfully created hotel booking",
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
                const response = yield this.hotelBookingService.fetchAll();
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched all hotel bookings",
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
                const response = yield this.hotelBookingService.fetchOne({ booking_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched hotel booking",
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
                const response = yield this.hotelBookingService.update(Object.assign({ booking_id: id }, req.body));
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully updated hotel booking",
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
                yield this.hotelBookingService.delete({ booking_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "Successfully deleted hotel booking",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
HotelBookingController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.HotelBookingService])
], HotelBookingController);
exports.default = HotelBookingController;
//# sourceMappingURL=booking.controller.js.map