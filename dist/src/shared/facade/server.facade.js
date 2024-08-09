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
const bodyParser = require("body-parser");
const services_1 = require("../services");
const _1 = require(".");
const middlewares_1 = require("../middlewares");
const helper_1 = require("../helper");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const stripe = require("stripe")(`${process.env.STRIPE_API_KEY}`);
let Server = class Server {
    constructor(app) {
        this.app = app;
        this.loggerService = tsyringe_1.container.resolve(services_1.LoggerService);
        this.subscriptionRepository = tsyringe_1.container.resolve(repositories_1.SubscriptionRepository);
        this.userRepository = tsyringe_1.container.resolve(repositories_1.UserRepository);
        this.planRepository = tsyringe_1.container.resolve(repositories_1.PlanRepository);
        this.database = tsyringe_1.container.resolve(_1.Database);
        this.stripeFacade = tsyringe_1.container.resolve(_1.Stripe);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const PORT = process.env.PORT;
            this.app.listen(PORT, () => {
                this.loggerService.log(`server listening to ${PORT}`);
                this.database.connect();
            });
        });
    }
    config(args) {
        const { middlewares, routes } = args;
        const BASE_URL = process.env.BASE_URL;
        this.app.use(middlewares_1.cors);
        this.app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;
            const sig = req.headers["stripe-signature"];
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            }
            catch (err) {
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.UNAUTHORIZED,
                    message: `webhook error: ${err.message}`,
                });
                return;
            }
            switch (event.type) {
                case "customer.created":
                    const customer_created = event.data.object;
                    yield this.loggerService.log("successfully created stripe customer", {
                        name: customer_created.name,
                        email: customer_created.email,
                    });
                    break;
                case "customer.deleted":
                    const customer_deleted = event.data.object;
                    yield this.loggerService.log("successfully deleted stripe customer", {
                        id: customer_deleted.id,
                    });
                    break;
                case "customer.updated":
                    const customer_updated = event.data.object;
                    yield this.loggerService.log("successfully updated stripe customer", {
                        name: customer_updated.name,
                        email: customer_updated.email,
                    });
                    break;
                case "customer.subscription.created":
                    const { id, current_period_end, current_period_start, items, customer, } = event.data.object;
                    const userData = yield this.userRepository.fetchOneByCustomerId(customer);
                    if (userData === null || userData === void 0 ? void 0 : userData.isFirstLogin) {
                        yield this.userRepository.updateAccountStatus(userData.stripe_customer_id ? userData.stripe_customer_id : "", constants_1.UserAccountStatus.ACTIVE);
                    }
                    const userId = yield this.database.convertStringToObjectId(userData === null || userData === void 0 ? void 0 : userData._id);
                    const plan = yield this.planRepository.fetchOneByStripePlanId(items.data[0].plan.id);
                    const planId = yield this.database.convertStringToObjectId(plan === null || plan === void 0 ? void 0 : plan._id);
                    const response = yield this.subscriptionRepository.create({
                        user: userId,
                        plan: planId,
                        stripe_subscription_id: id,
                        status: constants_1.SubscriptionStatus.ACTIVE,
                        start_date: new Date(current_period_start),
                        end_date: new Date(current_period_end),
                        amount: Number(items.data[0].plan.amount).toString(),
                    });
                    if (!response) {
                        throw new errors_1.InternalServerError("failed to add subscription to records", {
                            awsId: userData === null || userData === void 0 ? void 0 : userData.awscognito_user_id,
                        });
                    }
                    const update = yield this.userRepository.update(userData === null || userData === void 0 ? void 0 : userData._id, {
                        active_plan: planId,
                    });
                    yield this.loggerService.log("successfully subscribed customer to a plan", {
                        awsId: userData === null || userData === void 0 ? void 0 : userData.awscognito_user_id,
                    });
                    break;
                case "customer.subscription.deleted":
                    const {} = event.data.object;
                    break;
                case "customer.subscription.updated":
                    const {} = event.data.object;
                    break;
                case "setup_intent.created":
                    const {} = event.data.object;
                    break;
                case "setup_intent.succeeded":
                    const setupIntentSucceeded = event.data.object;
                    const card_details = yield this.stripeFacade.fetchCardDetails({
                        payment_method_id: setupIntentSucceeded.payment_method,
                        stripe_customer_id: setupIntentSucceeded.metadata.customer,
                    });
                    if (!card_details) {
                        throw new errors_1.BadRequestError("Failed to fetch cards");
                    }
                    const addCard = yield this.userRepository.updateWithCustomerId(setupIntentSucceeded.metadata.customer, {
                        stripe_card_id: setupIntentSucceeded.payment_method,
                        stripe_card_last_digits: card_details.last4,
                        stripe_card_expire_date: `${card_details.exp_month}/${card_details.exp_year}`,
                        stripe_card_type: card_details.brand,
                    });
                    // if (!addCard) {
                    //   throw new BadRequestError("Failed to add card");
                    // }
                    yield this.loggerService.log("successfully add card to user account", {
                        awsId: setupIntentSucceeded.metadata.user_cognito_id,
                    });
                    break;
                case "setup_intent.setup_failed":
                    const {} = event.data.object;
                    break;
                case "payment_intent.created":
                    const {} = event.data.object;
                    break;
                case "payment_intent.canceled":
                    const PaymentIntentCancelledData = event.data.object;
                    yield this.userRepository.fetchOneByCustomerId(PaymentIntentCancelledData.customer);
                    yield this.subscriptionRepository.updateByStripeSubId(PaymentIntentCancelledData.id);
                    yield this.userRepository.update(PaymentIntentCancelledData === null || PaymentIntentCancelledData === void 0 ? void 0 : PaymentIntentCancelledData._id, {
                        active_plan: undefined,
                    });
                    break;
                case "payment_intent.payment_failed":
                    const {} = event.data.object;
                    break;
                case "payment_intent.succeeded":
                    const {} = event.data.object;
                    break;
                case "plan.created":
                    const {} = event.data.object;
                    break;
                case "plan.deleted":
                    const {} = event.data.object;
                    break;
                case "plan.updated":
                    const {} = event.data.object;
                    break;
                case "price.created":
                    const {} = event.data.object;
                    break;
                case "price.deleted":
                    const {} = event.data.object;
                    break;
                case "price.updated":
                    const {} = event.data.object;
                    break;
                case "subscription_schedule.canceled":
                    const SubscriptionScheduleCanceledData = event.data.object;
                    const subscriptionScheduleUserData = yield this.userRepository.fetchOneByCustomerId(SubscriptionScheduleCanceledData.customer);
                    yield this.subscriptionRepository.updateByStripeSubId(SubscriptionScheduleCanceledData.id);
                    yield this.userRepository.update(subscriptionScheduleUserData === null || subscriptionScheduleUserData === void 0 ? void 0 : subscriptionScheduleUserData._id, {
                        active_plan: undefined,
                    });
                    break;
                case "subscription_schedule.completed":
                    const {} = event.data.object;
                    break;
                case "subscription_schedule.created":
                    const {} = event.data.object;
                    yield this.loggerService.log("subscription plan will expire in 7 days");
                    break;
                case "subscription_schedule.expiring":
                    const {} = event.data.object;
                    yield this.loggerService.log("subscription plan will expire in 7 days");
                    break;
                case "subscription_schedule.updated":
                    const {} = event.data.object;
                    break;
                default:
                    (0, helper_1.Res)({
                        res,
                        code: constants_1.StatusCodes.INTERNAL_SERVER,
                        message: `Unhandled event type: ${event.type}`,
                    });
            }
            res.send();
        }));
        middlewares.map((middleware) => {
            this.app.use(middleware);
        });
        routes.map((router) => {
            const URL = router.base ? `/${BASE_URL}/${router.base}` : `/${BASE_URL}`;
            router.routes.map((route) => {
                this.app.use(`${URL}${route.path}`, route.router);
            });
        });
        this.app.use(middlewares_1.errorMiddleware); // dont move this else error wont be caught
    }
};
Server = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [Function])
], Server);
exports.default = Server;
//# sourceMappingURL=server.facade.js.map