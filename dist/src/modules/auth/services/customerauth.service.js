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
const constants_1 = require("../../../shared/constants");
let CustomerAuthService = class CustomerAuthService {
    constructor(awsCognito, userRepository, stripe) {
        this.awsCognito = awsCognito;
        this.userRepository = userRepository;
        this.stripe = stripe;
    }
    signUp(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstname, lastname } = args;
            const response = yield this.awsCognito.signUp(args);
            if (!response) {
                throw new errors_1.BadRequestError("failed to signup ");
            }
            const { customer_id } = yield this.stripe.createCustomer({
                email,
                name: `${firstname} ${lastname}`,
            });
            if (!customer_id) {
                throw new errors_1.BadRequestError("failed to create customer account");
            }
            const user = yield this.userRepository.create({
                awscognito_user_id: response.userId,
                stripe_customer_id: customer_id,
                status: constants_1.UserAccountStatus.INCOMPLETE,
            });
            if (!user) {
                throw new errors_1.BadRequestError("failed to add user record");
            }
            return response;
        });
    }
    confirmSignup(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.awsCognito.confirmSignUp(args);
            // change user account status from UNCONFIRMED to ACTIVE
            yield this.userRepository.updateAccountStatus(args.userId, constants_1.UserAccountStatus.ACTIVE);
            //TODO: add logic to confirm user here
            return response;
        });
    }
    resendConfirmSignup(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.awsCognito.resendSignupConfirmationCode(args);
        });
    }
    signIn(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.awsCognito.signIn(args);
            return response;
        });
    }
    signOut(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.awsCognito.signOut(args);
        });
    }
    forgotPassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.awsCognito.forgotpassword(args);
        });
    }
    confirmForgotPassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.awsCognito.confirmForgotPassword(args);
        });
    }
};
CustomerAuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [facade_1.AWSCognito,
        repositories_1.UserRepository,
        facade_1.Stripe])
], CustomerAuthService);
exports.default = CustomerAuthService;
//# sourceMappingURL=customerauth.service.js.map