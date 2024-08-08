"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = exports.subscriptionRouter = exports.adminPlanRouter = void 0;
const adminplan_router_1 = __importDefault(require("./adminplan.router"));
exports.adminPlanRouter = adminplan_router_1.default;
const plan_router_1 = __importDefault(require("./plan.router"));
exports.planRouter = plan_router_1.default;
const subscription_router_1 = __importDefault(require("./subscription.router"));
exports.subscriptionRouter = subscription_router_1.default;
//# sourceMappingURL=index.js.map