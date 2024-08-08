"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerController = exports.FileController = exports.FolderController = void 0;
const file_controller_1 = __importDefault(require("./file.controller"));
exports.FileController = file_controller_1.default;
const filemanager_controller_1 = __importDefault(require("./filemanager.controller"));
exports.FileManagerController = filemanager_controller_1.default;
const folder_controller_1 = __importDefault(require("./folder.controller"));
exports.FolderController = folder_controller_1.default;
//# sourceMappingURL=index.js.map