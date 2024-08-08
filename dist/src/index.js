"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const facade_1 = require("./shared/facade");
const middlewares_1 = require("./shared/middlewares");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const server = new facade_1.Server(app);
server.config({
    middlewares: [express_1.default.json(), express_1.default.urlencoded({ extended: true }), middlewares_1.cors],
    routes: routes_1.routes,
});
server.start();
//# sourceMappingURL=index.js.map