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
let CardService = class CardService {
    constructor(userRepository, stripe) {
        this.userRepository = userRepository;
        this.stripe = stripe;
    }
    authorizeAddCard(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = args;
            const checkUser = yield this.userRepository.fetchOneByCognitoId(user_id);
            if (!checkUser) {
                throw new errors_1.BadRequestError("user not found");
            }
            const { stripe_customer_id, awscognito_user_id } = checkUser;
            const { client_secret } = yield this.stripe.setupIntent({ customer: stripe_customer_id, user_id: awscognito_user_id });
            if (!client_secret) {
                throw new errors_1.BadRequestError("failed while generating secret");
            }
            return {
                client_secret,
            };
        });
    }
    saveCard(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stripe_customer_id, stripe_card_id } = args;
            const user = yield this.userRepository.fetchOneByCustomerId(stripe_customer_id);
            if (!user) {
                throw new errors_1.BadRequestError("user not found");
            }
            const cardDetails = yield this.stripe.fetchCardDetails({
                payment_method_id: stripe_card_id,
                stripe_customer_id,
            });
            if (!cardDetails) {
                throw new errors_1.BadRequestError("failed to fetch card details");
            }
            const updateAccount = yield this.userRepository.updateWithCustomerId(stripe_customer_id, {
                stripe_card_id,
                stripe_card_last_digits: cardDetails.last4,
                stripe_card_expire_date: `${cardDetails.exp_month}/${cardDetails.exp_year}`,
                stripe_card_type: cardDetails.brand,
            });
            if (!updateAccount) {
                throw new errors_1.BadRequestError("failed to add card to user record");
            }
            return {
                isCardSaved: true,
            };
        });
    }
};
CardService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        facade_1.Stripe])
], CardService);
exports.default = CardService;
//# sourceMappingURL=card.service.js.map