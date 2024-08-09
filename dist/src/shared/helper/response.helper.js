"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = Res;
function Res(args) {
    const { res, code, message, error, data } = args;
    res.status(code).json({
        message,
        error,
        data,
    });
}
//# sourceMappingURL=response.helper.js.map