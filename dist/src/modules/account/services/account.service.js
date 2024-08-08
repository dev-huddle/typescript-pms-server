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
const services_1 = require("../../../shared/services");
let AccountService = class AccountService {
    constructor(awsCognito, userRepository, fileManager, loggerService) {
        this.awsCognito = awsCognito;
        this.userRepository = userRepository;
        this.fileManager = fileManager;
        this.loggerService = loggerService;
    }
    changePassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { awsId, previousPassword, proposedPassword, accessToken } = args;
            const response = yield this.awsCognito.changePassword({
                previousPassword,
                proposedPassword,
                accessToken,
            });
            yield this.loggerService.log("successfully changed account password", {
                dateChanged: new Date(),
                awsId,
            });
            return response;
        });
    }
    getAccount(accessToken, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.awsCognito.getProfile(accessToken);
            const user = yield this.userRepository.fetchOneByCognitoId(customerId);
            console.log("user profile: " + JSON.stringify(user));
            return Object.assign(Object.assign({}, response), { payment_method: (user === null || user === void 0 ? void 0 : user.stripe_card_id) ? user === null || user === void 0 ? void 0 : user.stripe_card_id : "", card_type: (user === null || user === void 0 ? void 0 : user.stripe_card_type) ? user === null || user === void 0 ? void 0 : user.stripe_card_type : "", card_last_digits: (user === null || user === void 0 ? void 0 : user.stripe_card_last_digits) ? user === null || user === void 0 ? void 0 : user.stripe_card_last_digits : "", card_expire_date: (user === null || user === void 0 ? void 0 : user.stripe_card_expire_date) ? user === null || user === void 0 ? void 0 : user.stripe_card_expire_date : "" });
        });
    }
    deleteAccount(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, awsId } = args;
            const user = yield this.userRepository.fetchOneByCognitoId(awsId);
            yield this.awsCognito.deleteProfile(accessToken);
            yield this.userRepository.deleteByCognitoId(awsId);
            yield this.fileManager.deleteManyByUserId(user === null || user === void 0 ? void 0 : user._id);
            yield this.loggerService.log("successfully deleted account", {
                awsId,
            });
            return {
                isDeleted: true,
            };
        });
    }
    updateAccount(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCognitoUser = yield this.awsCognito.updateProfile(args);
            return {
                isUpdated: deleteCognitoUser.isUpdated,
            };
        });
    }
};
AccountService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [facade_1.AWSCognito,
        repositories_1.UserRepository,
        repositories_1.FileManagerRepository,
        services_1.LoggerService])
], AccountService);
exports.default = AccountService;
//# sourceMappingURL=account.service.js.map