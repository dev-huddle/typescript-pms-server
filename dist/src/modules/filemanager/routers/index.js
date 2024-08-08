"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileManagerRouter = exports.fileRouter = exports.folderRouter = void 0;
const file_router_1 = __importDefault(require("./file.router"));
exports.fileRouter = file_router_1.default;
const filemanager_router_1 = __importDefault(require("./filemanager.router"));
exports.fileManagerRouter = filemanager_router_1.default;
const folder_router_1 = __importDefault(require("./folder.router"));
exports.folderRouter = folder_router_1.default;
//# sourceMappingURL=index.js.map