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
const errors_1 = require("../errors");
let PlanRepository = class PlanRepository {
    constructor() { }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.create(args);
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.find();
        });
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.findById(id);
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.planSchema.findOne({ _id: id });
            }
            catch (err) {
                throw new errors_1.InternalServerError(err);
            }
        });
    }
    fetchOneByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.findOne({ name });
        });
    }
    fetchOneByStripePlanId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.findOne({ stripe_price_id: id });
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.planSchema.findOneAndUpdate({ _id: id }, update);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
};
PlanRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], PlanRepository);
exports.default = PlanRepository;
//# sourceMappingURL=plan.repository.js.map