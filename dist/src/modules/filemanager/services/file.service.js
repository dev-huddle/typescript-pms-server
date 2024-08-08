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
const constants_1 = require("../../../shared/constants");
const errors_1 = require("../../../shared/errors");
const facade_1 = require("../../../shared/facade");
let FileService = class FileService {
    constructor(fileRepository, userRepository, database) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.database = database;
    }
    uploadFile(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { files, parent, user_id } = args;
            const user = yield this.userRepository.fetchOneByCognitoId(user_id);
            files.map((file) => __awaiter(this, void 0, void 0, function* () {
                yield this.fileRepository.create({
                    name: file ? file.originalname : "",
                    key: file ? file.key : "",
                    object_type: constants_1.FileManagerObjectTypes.FILE,
                    size: file ? file.size : 0,
                    parent: parent ? yield this.database.convertStringToObjectId(parent) : undefined,
                    user: yield this.database.convertStringToObjectId(user === null || user === void 0 ? void 0 : user._id),
                });
            }));
            return {
                isUploaded: true,
            };
        });
    }
    move(object_id, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkDestination = yield this.fileRepository.fetchOneById(to);
            if (!checkDestination) {
                throw new errors_1.BadRequestError("destination not found");
            }
            object_id.map((id, _) => __awaiter(this, void 0, void 0, function* () {
                const moveObject = yield this.fileRepository.update(id, {
                    parent: yield this.database.convertStringToObjectId(to),
                });
                if (!moveObject) {
                    throw new errors_1.BadRequestError("failed to move file");
                }
            }));
        });
    }
    copy(object_id, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkId = yield this.fileRepository.fetchOneById(object_id);
            if (!checkId) {
                throw new errors_1.BadRequestError("file not found");
            }
            const checkDestination = yield this.fileRepository.fetchOneById(to);
            if (!checkDestination) {
                throw new errors_1.BadRequestError("destination not found");
            }
            const copyFolder = yield this.fileRepository.create({
                name: checkId.name,
                object_type: checkId.object_type,
                user: checkId.user,
                parent: checkId.parent,
            });
            if (!copyFolder) {
                throw new errors_1.BadRequestError("failed to copy folder");
            }
        });
    }
    renameFile(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, file_id, user_id } = args;
            const user = yield this.userRepository.fetchOneByCognitoId(user_id);
            if (!user) {
                throw new errors_1.BadRequestError("account not found");
            }
            yield this.checkFileName(name, user._id);
            const renameFile = yield this.fileRepository.update(file_id, {
                name,
            });
            if (!renameFile) {
                throw new errors_1.NotModifiedError("failed to rename file");
            }
            return {
                data: renameFile,
            };
        });
    }
    checkFileName(name, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkName = yield this.fileRepository.fetchFileByName(name, user_id);
            if (checkName) {
                throw new errors_1.BadRequestError("file name taken");
            }
        });
    }
};
FileService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.FileRepository,
        repositories_1.UserRepository,
        facade_1.Database])
], FileService);
exports.default = FileService;
//# sourceMappingURL=file.service.js.map