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
const services_1 = require("../services");
const helper_1 = require("../../../shared/helper");
const constants_1 = require("../../../shared/constants");
let FolderController = class FolderController {
    constructor(folderService) {
        this.folderService = folderService;
    }
    move(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ids, to } = req.body;
                yield this.folderService.move(ids, to);
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "successfully moved folder",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    copy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { object_id, to } = req.body;
                yield this.folderService.copy(object_id, to);
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "successfully copied folder",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sub } = req.user;
                const { name, parent_folder_id } = req.body;
                const moveFolder = yield this.folderService.createFolder({
                    name,
                    parent_folder_id,
                    user_id: sub,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.CREATED,
                    message: "successfully created folder",
                    data: moveFolder,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.folderService.deleteFolder({
                    folder_id: id,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "successfully deleted folder",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    rename(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sub } = req.user;
                const { name, folder_id } = req.body;
                yield this.folderService.renameFolder({
                    name,
                    folder_id,
                    user_id: sub,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.NO_CONTENT,
                    message: "successfully renamed folder",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
FolderController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.FolderService])
], FolderController);
exports.default = FolderController;
//# sourceMappingURL=folder.controller.js.map