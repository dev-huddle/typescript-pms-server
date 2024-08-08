"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = exports.NotFoundError = exports.NotModifiedError = exports.InternalServerError = exports.CustomError = exports.BadRequestError = void 0;
const bad_request_error_1 = __importDefault(require("./bad_request.error"));
exports.BadRequestError = bad_request_error_1.default;
const custom_error_1 = require("./custom.error");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return custom_error_1.CustomError; } });
const internal_server_error_1 = __importDefault(require("./internal_server.error"));
exports.InternalServerError = internal_server_error_1.default;
const not_authorized_error_1 = __importDefault(require("./not_authorized.error"));
exports.NotAuthorizedError = not_authorized_error_1.default;
const not_found_error_1 = __importDefault(require("./not_found.error"));
exports.NotFoundError = not_found_error_1.default;
const not_modified_error_1 = __importDefault(require("./not_modified.error"));
exports.NotModifiedError = not_modified_error_1.default;
//# sourceMappingURL=index.js.map