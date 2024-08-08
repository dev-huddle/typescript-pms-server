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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("../services");
let Database = class Database {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    connect() {
        const DATABASE_URL = process.env.DATABASE_URL;
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(`${DATABASE_URL}`).then((res) => {
            this.loggerService.log("Successfully connected to database");
        }).catch((err) => {
            this.loggerService.log(err);
        });
    }
    disconnect() {
        mongoose_1.default.disconnect();
    }
};
Database = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.LoggerService])
], Database);
exports.default = Database;
//# sourceMappingURL=database.helper.js.map