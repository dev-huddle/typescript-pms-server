"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("./custom.error");
const logger_service_1 = __importDefault(require("../services/logger.service"));
const constants_1 = require("../constants");
class NotAuthorizedError extends custom_error_1.CustomError {
    constructor(message, metadata) {
        super(message);
        this.statusCode = constants_1.StatusCodes.UNAUTHORIZED;
        this.metadata = metadata;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        const logger = tsyringe_1.container.resolve(logger_service_1.default);
        logger.log(`${this.message}`);
        return [{ message: this.message }];
    }
}
exports.default = NotAuthorizedError;
//# sourceMappingURL=not_authorized.error.js.map