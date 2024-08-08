"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../services");
const errors_1 = require("../errors");
const constants_1 = require("../constants");
const helper_1 = require("../helper");
const errorMiddleware = (err, req, res, next) => {
    const logger = tsyringe_1.container.resolve(services_1.LoggerService);
    logger.log(`${err.message}`);
    if (err instanceof errors_1.CustomError) {
        return (0, helper_1.Res)({
            res,
            code: err.statusCode,
            message: "error occured",
            error: err.serializeErrors(),
        });
    }
    (0, helper_1.Res)({
        res,
        code: constants_1.StatusCodes.INTERNAL_SERVER,
        message: "error occured",
        error: [{ message: err.message }],
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map