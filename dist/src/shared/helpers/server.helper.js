"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const tsyringe_1 = require("tsyringe");
const services_1 = require("../services");
const _1 = require(".");
const constants_1 = require("../constants");
let Server = class Server {
    constructor(app) {
        this.app = app;
        this.logger = tsyringe_1.container.resolve(services_1.LoggerService);
        this.database = tsyringe_1.container.resolve(_1.Database);
    }
    response(args) {
        const { res, code, message, data } = args;
        res.status(code).json({
            message,
            data,
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const PORT = process.env.PORT;
            this.app.listen(PORT, () => {
                this.logger.log(`server listening to ${PORT}`);
                this.database.connect();
            });
        });
    }
    config(args) {
        const { middlewares, routes } = args;
        const BASE_URL = process.env.BASE_URL;
        middlewares.map((middleware) => {
            this.app.use(middleware);
        });
        routes.map((router) => {
            const URL = router.base ? `/${BASE_URL}/${router.base}` : `/${BASE_URL}`;
            router.routes.map((route) => {
                this.app.use(`${URL}${route.path}`, route.router);
            });
            this.app.use((req, res, next) => {
                this.response({
                    res,
                    code: constants_1.StatusCodes.NOT_FOUND,
                    message: "Unknown API path"
                });
            });
        });
    }
};
Server = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [Function])
], Server);
exports.default = Server;
//# sourceMappingURL=server.helper.js.map