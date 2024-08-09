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
const schemas_1 = require("../schemas");
const constants_1 = require("../constants");
let SubscriptionRepository = class SubscriptionRepository {
    constructor() { }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.create(args);
        });
    }
    fetchAll() {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.findById(id);
        });
    }
    fetchByPriceId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.findOne({ plan: id });
        });
    }
    fetchActiveByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.findOne({
                user: user_id,
                status: constants_1.SubscriptionStatus.ACTIVE,
            });
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.findOneAndUpdate({ _id: id }, update);
        });
    }
    updateByStripeSubId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.subscriptionSchema.findOneAndUpdate({ stripe_subscription_id: id }, {
                status: constants_1.SubscriptionStatus.CANCELLED,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
};
SubscriptionRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SubscriptionRepository);
exports.default = SubscriptionRepository;
//# sourceMappingURL=subscription.repository.js.map