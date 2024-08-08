"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const adminPlanRouter = (0, express_1.Router)();
const adminPlanController = tsyringe_1.container.resolve(controllers_1.AdminPlanController);
adminPlanRouter.post("/create-plan", middlewares_1.authMiddleware, (req, res, next) => adminPlanController.createPlan(req, res, next));
adminPlanRouter.delete("/:planid", middlewares_1.authMiddleware, (req, res, next) => adminPlanController.createPlan(req, res, next));
exports.default = adminPlanRouter;
//# sourceMappingURL=adminplan.router.js.map