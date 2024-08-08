"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerService = exports.FileService = exports.FolderService = void 0;
const file_service_1 = __importDefault(require("./file.service"));
exports.FileService = file_service_1.default;
const filemanager_service_1 = __importDefault(require("./filemanager.service"));
exports.FileManagerService = filemanager_service_1.default;
const folder_service_1 = __importDefault(require("./folder.service"));
exports.FolderService = folder_service_1.default;
//# sourceMappingURL=index.js.map