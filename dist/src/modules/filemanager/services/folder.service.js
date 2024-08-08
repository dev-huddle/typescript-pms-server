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
const constants_1 = require("../../../shared/constants");
const facade_1 = require("../../../shared/facade");
let FolderService = class FolderService {
    constructor(folderRepository, userRepository, database) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.database = database;
    }
    move(object_id, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkDestination = yield this.folderRepository.fetchOneById(to);
            if (!checkDestination) {
                throw new errors_1.BadRequestError("destionation not found");
            }
            object_id.map((id, _) => __awaiter(this, void 0, void 0, function* () {
                const moveObject = yield this.folderRepository.update(id, {
                    parent: yield this.database.convertStringToObjectId(to),
                });
                if (!moveObject) {
                    throw new errors_1.BadRequestError("failed to move folder");
                }
            }));
        });
    }
    copy(object_id, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkId = yield this.folderRepository.fetchOneById(object_id);
            if (!checkId) {
                throw new errors_1.BadRequestError("folder not found");
            }
            const checkDestination = yield this.folderRepository.fetchOneById(to);
            if (!checkDestination) {
                throw new errors_1.BadRequestError("destionation not found");
            }
            const copyFolder = yield this.folderRepository.create({
                name: checkId.name,
                object_type: checkId.object_type,
                user: checkId.user,
                parent: checkId.parent,
            });
            if (!copyFolder) {
                throw new errors_1.BadRequestError("failed to copy folder");
            }
            const childobjects = yield this.folderRepository.fetchAllById(object_id);
            childobjects.map((object) => __awaiter(this, void 0, void 0, function* () {
                yield this.folderRepository.create({
                    name: object.name,
                    object_type: object.object_type,
                    user: object.user,
                    parent: yield this.database.convertStringToObjectId(copyFolder._id),
                });
            }));
        });
    }
    createFolder(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, parent_folder_id, user_id } = args;
            const user = yield this.userRepository.fetchOneByCognitoId(user_id);
            if (!user) {
                throw new errors_1.BadRequestError("account not found");
            }
            yield this.checkFolderName(name, user._id);
            const addFolder = yield this.folderRepository.create({
                name: name,
                user: yield this.database.convertStringToObjectId(user._id),
                parent: parent_folder_id ? yield this.database.convertStringToObjectId(parent_folder_id) : undefined,
                object_type: constants_1.FileManagerObjectTypes.FOLDER,
            });
            if (!addFolder) {
                throw new errors_1.InternalServerError("failed to add folder");
            }
            return {
                isFolderCreated: true,
            };
        });
    }
    deleteFolder(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { folder_id } = args;
            const checkId = yield this.folderRepository.fetchOneById(folder_id);
            if (!checkId) {
                throw new errors_1.BadRequestError("failed to provide folder id");
            }
            const deleteFolder = yield this.folderRepository.delete(folder_id);
            if (!deleteFolder) {
                throw new errors_1.NotFoundError("failed to delete folder");
            }
        });
    }
    renameFolder(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, folder_id, user_id } = args;
            const user = yield this.userRepository.fetchOneByCognitoId(user_id);
            if (!user) {
                throw new errors_1.BadRequestError("account not found");
            }
            yield this.checkFolderName(name, user._id);
            const renameFolder = yield this.folderRepository.update(folder_id, {
                name,
            });
            if (!renameFolder) {
                throw new errors_1.NotModifiedError("failed to rename folder");
            }
            return {
                data: renameFolder,
            };
        });
    }
    checkFolderName(name, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkName = yield this.folderRepository.fetchFoldersByName(name, user_id);
            if (checkName) {
                throw new errors_1.BadRequestError("folder name taken");
            }
        });
    }
};
FolderService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.FolderRepository,
        repositories_1.UserRepository,
        facade_1.Database])
], FolderService);
exports.default = FolderService;
//# sourceMappingURL=folder.service.js.map