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
let PlanService = class PlanService {
    constructor(planRepository, subscriptionRepository, userRepository, database) {
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.database = database;
    }
    getPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.planRepository.fetchAll();
        });
    }
    getActivePlan(cognitoId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userData = yield this.userRepository.fetchOneByCognitoId(cognitoId);
            if (!userData) {
                throw new errors_1.BadRequestError("user not found");
            }
            const plan = yield this.planRepository.fetchOneById((_a = userData.active_plan) === null || _a === void 0 ? void 0 : _a.toString());
            const subscription = yield this.subscriptionRepository.fetchByPriceId((_b = plan === null || plan === void 0 ? void 0 : plan._id) === null || _b === void 0 ? void 0 : _b.toString());
            return {
                _id: plan === null || plan === void 0 ? void 0 : plan._id,
                name: plan ? plan.name : "",
                amount: plan ? plan.amount : "",
                createdDate: subscription === null || subscription === void 0 ? void 0 : subscription.start_date,
            };
        });
    }
};
PlanService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.PlanRepository,
        repositories_1.SubscriptionRepository,
        repositories_1.UserRepository,
        facade_1.Database])
], PlanService);
exports.default = PlanService;
//# sourceMappingURL=plan.service.js.map