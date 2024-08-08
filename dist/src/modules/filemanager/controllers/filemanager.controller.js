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
const helper_1 = require("../../../shared/helper");
const services_1 = require("../services");
let FileManagerController = class FileManagerController {
    constructor(fileManagerService) {
        this.fileManagerService = fileManagerService;
    }
    getAllObjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, folder } = req.query;
                const { sub } = req.user;
                const response = yield this.fileManagerService.getAllObjects({
                    user_id: sub,
                    page: page ? page.toString() : "1",
                    limit: limit ? limit.toString() : "10",
                    folder: folder === null || folder === void 0 ? void 0 : folder.toString(),
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully fetched all objects",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteObject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.fileManagerService.deleteObject({
                    object_id: id,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully deleted all objects",
                    data: response,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteManyObject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ids } = req.body;
                yield this.fileManagerService.deleteManyObjects({
                    object_ids: ids,
                });
                (0, helper_1.Res)({
                    res,
                    code: constants_1.StatusCodes.OK,
                    message: "successfully deleted all objects",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
};
FileManagerController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.FileManagerService])
], FileManagerController);
exports.default = FileManagerController;
//# sourceMappingURL=filemanager.controller.js.map