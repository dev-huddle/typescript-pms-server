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
let FileManagerService = class FileManagerService {
    constructor(fileManagerRepository, userRepository) {
        this.fileManagerRepository = fileManagerRepository;
        this.userRepository = userRepository;
    }
    getAllObjects(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, page, limit, folder } = args;
            const pageNumber = parseInt(page) || 1;
            const limitNumber = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * limitNumber;
            const check_user_id = yield this.userRepository.fetchOneByCognitoId(user_id);
            const totalObject = yield this.fileManagerRepository.totalObjectByUser(check_user_id === null || check_user_id === void 0 ? void 0 : check_user_id._id, folder);
            const page_count = Math.ceil(totalObject / limitNumber).toString();
            const response = yield this.fileManagerRepository.fetchAllByUserId(check_user_id === null || check_user_id === void 0 ? void 0 : check_user_id._id, skip, limitNumber, folder);
            return {
                data: response,
                page_count,
                current_page_number: page.toString(),
            };
        });
    }
    deleteObject(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { object_id } = args;
            const checkObject = yield this.fileManagerRepository.fetchOneById(object_id);
            if (!checkObject) {
                throw new errors_1.BadRequestError("object not found");
            }
            const deleteObject = yield this.fileManagerRepository.delete(object_id);
            if (!deleteObject) {
                throw new errors_1.InternalServerError("failed to delete object");
            }
            return {
                isObjectDeleted: true,
            };
        });
    }
    deleteManyObjects(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { object_ids } = args;
            yield this.fileManagerRepository.deleteMany(object_ids);
            return {
                isDeleted: true,
            };
        });
    }
};
FileManagerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.FileManagerRepository,
        repositories_1.UserRepository])
], FileManagerService);
exports.default = FileManagerService;
//# sourceMappingURL=filemanager.service.js.map