"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const subscriptionRouter = (0, express_1.Router)();
const subscriptionController = tsyringe_1.container.resolve(controllers_1.SubscriptionController);
subscriptionRouter.post("/subscribe", middlewares_1.authMiddleware, (req, res, next) => subscriptionController.createSubscription(req, res, next));
subscriptionRouter.patch("/cancel", middlewares_1.authMiddleware, (req, res, next) => subscriptionController.cancelSubscription(req, res, next));
exports.default = subscriptionRouter;
//# sourceMappingURL=subscription.router.js.map