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
let HotelBookingService = class HotelBookingService {
    constructor(hotelBookingRepository, database) {
        this.hotelBookingRepository = hotelBookingRepository;
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guest_id, room_id, check_in_date, check_out_date, status, amount } = args;
            const response = yield this.hotelBookingRepository.create({
                bookee_id: yield this.database.convertStringToObjectId(guest_id),
                hotel_room_id: yield this.database.convertStringToObjectId(room_id),
                check_in_date: check_in_date,
                check_out_date: check_out_date,
                status: status,
            });
            if (!response) {
                throw new errors_1.BadRequestError("Failed to create hotel booking");
            }
            //TODO: create a transaction
            return {
                is_created: true,
                booking_id: response._id,
            };
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.hotelBookingRepository.fetchAll();
            return {
                bookings: response,
            };
        });
    }
    fetchOne(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { booking_id } = args;
            const response = yield this.hotelBookingRepository.fetchOneById(booking_id);
            if (!response) {
                throw new errors_1.BadRequestError("Hotel booking not found");
            }
            return {
                booking: response,
            };
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { booking_id, guest_id, room_id, check_in_date, check_out_date, status, amount_paid } = args;
            const updateBooking = yield this.hotelBookingRepository.update(booking_id, {
                bookee_id: yield this.database.convertStringToObjectId(guest_id),
                hotel_room_id: yield this.database.convertStringToObjectId(room_id),
                check_in_date,
                check_out_date,
                status: status,
            });
            if (!updateBooking) {
                throw new errors_1.BadRequestError("Failed to update hotel booking");
            }
            return {
                is_updated: true,
            };
        });
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { booking_id } = args;
            const response = yield this.hotelBookingRepository.delete(booking_id);
            if (!response) {
                throw new errors_1.BadRequestError("Failed to delete hotel booking");
            }
            return {
                is_deleted: true,
            };
        });
    }
};
HotelBookingService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.HotelBookingRepository,
        facade_1.Database])
], HotelBookingService);
exports.default = HotelBookingService;
//# sourceMappingURL=booking.service.js.map