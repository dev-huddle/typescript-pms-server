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
const constants_1 = require("../../../shared/constants");
const services_1 = require("../services");
const helper_1 = require("../../../shared/helper");
let CustomerAuthController = class CustomerAuthController {
    constructor(customerAuthService) {
        this.customerAuthService = customerAuthService;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, firstname, lastname } = req.body;
                const response = yield this.customerAuthService.signUp({
                    email,
                    firstname,
                    lastname,
                    password,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "successfully created user account",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    confirmSignUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, confirmationcode, user_id } = req.body;
                const response = yield this.customerAuthService.confirmSignup({
                    email,
                    confirmationcode,
                    userId: user_id,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully confirmed account",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    resendSignupConfirmationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const response = yield this.customerAuthService.resendConfirmSignup({
                    email,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully resent confirmation code",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.customerAuthService.signIn({
                    email,
                    password,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully signed in",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    signOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                const response = yield this.customerAuthService.signOut({
                    access_token: authorization ? authorization : "",
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully signed out",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    forgotpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const response = yield this.customerAuthService.forgotPassword({
                    email,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully sent forgotpassword email",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    confirmForgotpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, confirmationcode } = req.body;
                const response = yield this.customerAuthService.confirmForgotPassword({
                    email,
                    password,
                    confirmationcode,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully reset password",
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
};
CustomerAuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.CustomerAuthService])
], CustomerAuthController);
exports.default = CustomerAuthController;
//# sourceMappingURL=customerauth.controller.js.map