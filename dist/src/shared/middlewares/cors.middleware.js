"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("stripe-signature", "*");
    next();
};
exports.cors = cors;
//# sourceMappingURL=cors.middleware.js.map