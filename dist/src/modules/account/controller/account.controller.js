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
const helper_1 = require("../../../shared/helper");
const constants_1 = require("../../../shared/constants");
const services_1 = require("../services");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const { previousPassword, proposedPassword } = req.body;
                const { sub } = req.user;
                yield this.accountService.changePassword({
                    previousPassword,
                    proposedPassword,
                    accessToken: accessToken ? accessToken : "",
                    awsId: sub,
                });
                (0, helper_1.Res)({
                    res,
                    message: "successfully changepassword",
                    code: constants_1.StatusCodes.NO_CONTENT,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const { sub } = req.user;
                yield this.accountService.deleteAccount({
                    awsId: sub,
                    accessToken: accessToken ? accessToken : "",
                });
                (0, helper_1.Res)({
                    res,
                    message: "successfully deleted account",
                    code: constants_1.StatusCodes.NO_CONTENT,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const { user } = req;
                const response = yield this.accountService.getAccount(accessToken ? accessToken : "", user.sub);
                (0, helper_1.Res)({
                    res,
                    message: "successfully fetch account details",
                    code: constants_1.StatusCodes.OK,
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const { first_name, last_name } = req.body;
                const { sub } = req.user;
                const response = yield this.accountService.updateAccount({
                    firstName: first_name,
                    lastName: last_name,
                    accessToken: accessToken ? accessToken : "",
                    cognitoId: sub,
                });
                (0, helper_1.Res)({
                    res,
                    message: "successfully fetch account details",
                    code: constants_1.StatusCodes.OK,
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
AccountController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.AccountService])
], AccountController);
exports.default = AccountController;
//# sourceMappingURL=account.controller.js.map