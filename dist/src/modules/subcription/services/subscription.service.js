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
const facade_1 = require("../../../shared/facade");
const repositories_1 = require("../../../shared/repositories");
const errors_1 = require("../../../shared/errors");
let SubscriptionService = class SubscriptionService {
    constructor(stripe, planRepository, userRepository, subscriptionRepository) {
        this.stripe = stripe;
        this.planRepository = planRepository;
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    createSubscription(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, plan } = args;
            const checkUser = yield this.userRepository.fetchOneByCognitoId(user);
            if (!checkUser) {
                throw new errors_1.BadRequestError("user not found");
            }
            const { stripe_customer_id, stripe_card_id } = checkUser;
            const checkPlan = yield this.planRepository.fetchOneById(plan);
            if (!checkPlan) {
                throw new errors_1.BadRequestError("failed to fetch plan");
            }
            const { stripe_price_id } = checkPlan;
            const { subscription_id } = yield this.stripe.createSubscription({
                price_id: stripe_price_id,
                customer_id: stripe_customer_id ? stripe_customer_id : "",
                payment_method: stripe_card_id,
                user: checkUser._id ? checkUser._id.toString() : "",
                plan,
            });
            if (!subscription_id) {
                throw new errors_1.InternalServerError("failed to create subscription");
            }
            //TODO: send notification via push notification and email notification
            return {
                processing: true,
            };
        });
    }
    cancelSubscription(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = args;
            const checkUser = yield this.userRepository.fetchOneByCognitoId(user_id);
            if (!checkUser) {
                throw new errors_1.BadRequestError("user not found");
            }
            const stripeResponse = yield this.subscriptionRepository.fetchActiveByUserId(checkUser._id);
            const response = yield this.stripe.cancelSubscription({ subscription_id: stripeResponse === null || stripeResponse === void 0 ? void 0 : stripeResponse.stripe_subscription_id });
            return {
                status: response.status,
            };
        });
    }
};
SubscriptionService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [facade_1.Stripe,
        repositories_1.PlanRepository,
        repositories_1.UserRepository,
        repositories_1.SubscriptionRepository])
], SubscriptionService);
exports.default = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map