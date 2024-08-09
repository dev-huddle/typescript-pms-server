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
const facade_1 = require("../facade");
const errors_1 = require("../errors");
let UserRepository = class UserRepository {
    constructor(database) {
        this.database = database;
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.create(args);
        });
    }
    fetchAll() {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = yield this.database.convertStringToObjectId(id);
            return yield schemas_1.userSchema.findOne({ _id: id });
        });
    }
    fetchOneByCustomerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.findOne({ stripe_customer_id: id });
        });
    }
    fetchOneByPaymentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.findOne({ stripe_card_id: id });
        });
    }
    fetchOneByCognitoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.userSchema.findOne({ awscognito_user_id: id });
            }
            catch (err) {
                throw new errors_1.BadRequestError("user not found");
            }
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.userSchema.findOneAndUpdate({ _id: id }, update);
            }
            catch (err) {
                throw new errors_1.BadRequestError("failed to update user");
            }
        });
    }
    updateWithCustomerId(customer_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.userSchema.findOneAndUpdate({ stripe_customer_id: customer_id }, update);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    deleteByCognitoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.deleteOne({ awscognito_user_id: id });
        });
    }
    clearCardDetails(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.findOneAndUpdate({ awscognito_user_id: user_id }, {
                stripe_card_expire_date: "",
                stripe_card_id: "",
                stripe_card_last_digits: "",
                stripe_card_type: "",
            });
        });
    }
    updateAccountStatus(customer_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.userSchema.findOneAndUpdate({ stripe_customer_id: customer_id }, { status });
        });
    }
};
UserRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [facade_1.Database])
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map