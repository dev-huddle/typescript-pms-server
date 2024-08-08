"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
function Res(args) {
    const { res, code, message, error, data } = args;
    res.status(code).json({
        message,
        error,
        data,
    });
}
exports.Res = Res;
//# sourceMappingURL=response.helper.js.map