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
const constants_1 = require("../constants");
const helper_1 = require("../helper");
const services_1 = require("../services");
const errors_1 = require("../errors");
const stripe = require("stripe")(`${process.env.STRIPE_API_KEY}`);
let Stripe = class Stripe {
    constructor(stripeHelper, loggerService) {
        this.stripeHelper = stripeHelper;
        this.loggerService = loggerService;
    }
    setupIntent(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer, user_id } = args;
                const { client_secret } = yield stripe.setupIntents.create({
                    customer,
                    payment_method_types: [constants_1.StripePaymentMethodType.CARD],
                    metadata: {
                        customer,
                        user_cognito_id: user_id
                    },
                });
                return {
                    client_secret,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed setupintent attempt");
            }
        });
    }
    paymentIntent(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer, amount, payment_method } = args;
                const { id } = yield stripe.paymentIntents.create({
                    amount: this.stripeHelper.currencyConverter(amount),
                    currency: constants_1.StripeCurriencies.USD,
                    payment_method,
                    metadata: {},
                    payment_method_types: [constants_1.StripePaymentMethodType.CARD],
                    customer,
                });
                if (!id) {
                    throw new errors_1.InternalServerError("failed to create payment intent");
                }
                return {
                    charge_id: id,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed paymentintent attempt");
            }
        });
    }
    paymentConfirm(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, payment_id } = args;
                const response = yield stripe.paymentIntents.confirm(id, { payment_method: payment_id });
                if (!response) {
                    throw new errors_1.InternalServerError("failed to confirm payment");
                }
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed paymentconfirm attempt");
            }
        });
    }
    createCustomer(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name } = args;
                const customer = yield stripe.customers.create({
                    email,
                    name,
                });
                console.log("stripe customer: " + customer);
                if (!customer) {
                    throw new errors_1.InternalServerError("failed to create customer");
                }
                return {
                    customer_id: customer.id,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to create stripe customer account");
            }
        });
    }
    deleteCustomer(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer_id } = args;
                const response = yield stripe.customers.del(customer_id);
                if (!response) {
                    throw new errors_1.InternalServerError("failed to delete customer");
                }
                return {
                    isDeleted: response.deleted,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to delete stripe customer account");
            }
        });
    }
    deleteCard(payment_method_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield stripe.paymentMethods.detach(payment_method_id);
                if (!response) {
                    throw new errors_1.InternalServerError("failed to delete card");
                }
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to delete card from stripe");
            }
        });
    }
    fetchCardDetails(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payment_method_id, stripe_customer_id } = args;
                const { card } = yield stripe.paymentMethods.retrieve(stripe_customer_id, payment_method_id);
                if (!card) {
                    throw new errors_1.InternalServerError("failed to retrieved card");
                }
                return {
                    last4: card.last4,
                    exp_month: card.exp_month,
                    exp_year: card.exp_year,
                    brand: card.brand,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to delete card from stripe");
            }
        });
    }
    createPlan(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, name } = args;
                const { id, product } = yield stripe.prices.create({
                    currency: "usd",
                    unit_amount: Number(amount),
                    recurring: {
                        interval: "month",
                    },
                    product_data: {
                        name,
                    },
                });
                if (!id) {
                    throw new errors_1.InternalServerError("failed to create price");
                }
                const response = yield stripe.plans.create({
                    amount: Number(amount),
                    currency: "usd",
                    interval: "month",
                    product,
                });
                if (!response) {
                    throw new errors_1.InternalServerError("failed to create plan");
                }
                return {
                    plan_id: response.id,
                    price_id: id,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to create plan");
            }
        });
    }
    deletePlan(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { plan_id } = args;
                const response = yield stripe.plans.del(plan_id);
                if (!response) {
                    throw new errors_1.InternalServerError("failed to delete plan");
                }
                return {
                    isPlanDeleted: response.deleted,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to delete plan");
            }
        });
    }
    createSubscription(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer_id, price_id, payment_method, user, plan } = args;
                console.log("user id: " + user);
                console.log("plan id: " + plan);
                const response = yield stripe.subscriptions.create({
                    customer: customer_id,
                    currency: "usd",
                    items: [
                        {
                            price: price_id,
                        },
                    ],
                    payment_behavior: "default_incomplete",
                    payment_method,
                    metadata: {
                        user,
                        plan,
                    },
                });
                if (!response) {
                    throw new errors_1.InternalServerError("failed to create subscription");
                }
                return {
                    subscription_id: response.id,
                    subscription_end_date: response.current_period_end,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed creating subscription");
            }
        });
    }
    updateSubscription(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subscription_id, order_id } = args;
                const response = yield stripe.subscriptions.update(subscription_id, {
                    metadata: {
                        order_id,
                    },
                });
                if (!response) {
                    throw new errors_1.InternalServerError("failed to update subscription");
                }
                return {
                    isUpdated: response.id ? true : false,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to update subscription");
            }
        });
    }
    cancelSubscription(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subscription_id } = args;
                const { status } = yield stripe.subscriptions.cancel(subscription_id);
                return {
                    status: status === "canceled" ? true : false,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed attempt to cancel subscription");
            }
        });
    }
};
Stripe = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [helper_1.StripeHelper,
        services_1.LoggerService])
], Stripe);
exports.default = Stripe;
//# sourceMappingURL=stripe.facade.js.map