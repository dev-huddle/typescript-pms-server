"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    StatusCodes[StatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCodes[StatusCodes["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
    StatusCodes[StatusCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
//# sourceMappingURL=server.constant.js.map