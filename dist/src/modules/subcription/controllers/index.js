"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanController = exports.AdminPlanController = exports.SubscriptionController = void 0;
const adminplan_controller_1 = __importDefault(require("./adminplan.controller"));
exports.AdminPlanController = adminplan_controller_1.default;
const plan_controller_1 = __importDefault(require("./plan.controller"));
exports.PlanController = plan_controller_1.default;
const subscription_controller_1 = __importDefault(require("./subscription.controller"));
exports.SubscriptionController = subscription_controller_1.default;
//# sourceMappingURL=index.js.map