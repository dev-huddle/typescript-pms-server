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
let HotelOrderService = class HotelOrderService {
    constructor(hotelOrderRepository, database) {
        this.hotelOrderRepository = hotelOrderRepository;
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guest_id, items, total_amount, status } = args;
            const response = yield this.hotelOrderRepository.create({
                guest_id: yield this.database.convertStringToObjectId(guest_id),
                items,
                amount: total_amount.toString(),
                status: status
            });
            if (!response) {
                throw new errors_1.BadRequestError("Failed to create order");
            }
            return {
                is_created: true,
                order_id: response._id,
            };
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.hotelOrderRepository.fetchAll();
            return {
                orders: response,
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id } = args;
            const response = yield this.hotelOrderRepository.fetchOneById(order_id);
            if (!response) {
                throw new errors_1.BadRequestError("Hotel order not found");
            }
            return {
                order: response,
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id, guest_id, room_id, items, total_amount, status } = args;
            const updateOrder = yield this.hotelOrderRepository.update(order_id, {
                guest_id: yield this.database.convertStringToObjectId(guest_id),
                items,
                amount: total_amount === null || total_amount === void 0 ? void 0 : total_amount.toString(),
                status: status,
            });
            if (!updateOrder) {
                throw new errors_1.BadRequestError("Failed to update hotel order");
            }
            return {
                is_updated: true,
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id } = args;
            const response = yield this.hotelOrderRepository.delete(order_id);
            if (!response) {
                throw new errors_1.BadRequestError("Failed to delete hotel order");
            }
            return {
                is_deleted: true,
            };
        });
    }
};
HotelOrderService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelOrderRepository,
        facade_1.Database])
], HotelOrderService);
exports.default = HotelOrderService;
//# sourceMappingURL=order.service.js.map