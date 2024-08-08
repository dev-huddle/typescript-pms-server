"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const middlewares_1 = require("../../../shared/middlewares");
const controllers_1 = require("../controllers");
const planRouter = (0, express_1.Router)();
const planController = tsyringe_1.container.resolve(controllers_1.PlanController);
planRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => planController.getPlans(req, res, next));
planRouter.get("/active-plan", middlewares_1.authMiddleware, (req, res, next) => planController.getActivePlan(req, res, next));
exports.default = planRouter;
//# sourceMappingURL=plan.router.js.map