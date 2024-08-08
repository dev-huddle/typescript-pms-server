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
let FileManagerRepository = class FileManagerRepository {
    constructor() { }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.create(args);
        });
    }
    fetchAll() {
        throw new Error("Method not implemented.");
    }
    fetchAllByUserId(user_id, skip, limit, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (folder) {
                    return yield schemas_1.filemanagerSchema.find({ user: user_id, parent: folder }).skip(skip).limit(limit);
                }
                else {
                    return yield schemas_1.filemanagerSchema.find({ user: user_id }).skip(skip).limit(limit);
                }
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed to fetch all user objects");
            }
        });
    }
    totalObjectByUser(user_id, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (folder) {
                    return yield schemas_1.filemanagerSchema.countDocuments({ user: user_id, parent: folder }).exec();
                }
                else {
                    return yield schemas_1.filemanagerSchema.countDocuments({ user: user_id }).exec();
                }
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed to get total object count for user");
            }
        });
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.findOne({ _id: id });
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.findOneAndUpdate({ _id: id }, update);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.deleteOne({ _id: id });
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.deleteMany({ _id: { $in: ids } });
        });
    }
    deleteManyByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.deleteMany({ user: user_id });
        });
    }
};
FileManagerRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FileManagerRepository);
exports.default = FileManagerRepository;
//# sourceMappingURL=filemanager.repository.js.map