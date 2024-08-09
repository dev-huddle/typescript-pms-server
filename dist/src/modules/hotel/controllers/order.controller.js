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
let HotelOrderController = class HotelOrderController {
    constructor(hotelOrderService) {
        this.hotelOrderService = hotelOrderService;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { guest_id, room_id, items, total_amount, status } = req.body;
                const response = yield this.hotelOrderService.create({
                    guest_id,
                    room_id,
                    items,
                    total_amount,
                    status,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "Successfully created hotel order",
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
                const response = yield this.hotelOrderService.fetchAll();
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched all hotel orders",
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
                const response = yield this.hotelOrderService.fetchOne({ order_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully fetched hotel order",
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
                const response = yield this.hotelOrderService.update(Object.assign({ order_id: id }, req.body));
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "Successfully updated hotel order",
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
                yield this.hotelOrderService.delete({ order_id: id });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "Successfully deleted hotel order",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
HotelOrderController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.HotelOrderService])
], HotelOrderController);
exports.default = HotelOrderController;
//# sourceMappingURL=order.controller.js.map