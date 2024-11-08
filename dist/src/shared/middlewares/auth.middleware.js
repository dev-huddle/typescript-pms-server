"use strict";
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
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const helper_1 = require("../helper");
const tsyringe_1 = require("tsyringe");
const awsHelper = tsyringe_1.container.resolve(helper_1.AWS);
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (!access_token) {
            throw new errors_1.NotAuthorizedError("failed to find token");
        }
        const verifySecret = yield awsHelper.verifySecret(access_token);
        req.user = verifySecret;
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map