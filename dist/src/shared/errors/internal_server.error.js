"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("./custom.error");
const logger_service_1 = __importDefault(require("../services/logger.service"));
const constants_1 = require("../constants");
class InternalServerError extends custom_error_1.CustomError {
    constructor(message, metadata) {
        super(message);
        this.statusCode = constants_1.StatusCodes.INTERNAL_SERVER;
        this.metadata = metadata;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serializeErrors() {
        const logger = tsyringe_1.container.resolve(logger_service_1.default);
        logger.log(`${this.message}`);
        return [{ message: this.message }];
    }
}
exports.default = InternalServerError;
//# sourceMappingURL=internal_server.error.js.map