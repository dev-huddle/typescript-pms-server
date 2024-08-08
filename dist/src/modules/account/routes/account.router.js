"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const middlewares_1 = require("../../../shared/middlewares");
const controller_1 = require("../controller");
const accountRouter = (0, express_1.Router)();
const accountController = tsyringe_1.container.resolve(controller_1.AccountController);
accountRouter.patch("/changepassword", middlewares_1.authMiddleware, (req, res, next) => accountController.changePassword(req, res, next));
accountRouter.delete("/", middlewares_1.authMiddleware, (req, res, next) => accountController.deleteAccount(req, res, next));
accountRouter.get("/profile", middlewares_1.authMiddleware, (req, res, next) => accountController.getAccount(req, res, next));
accountRouter.patch("/update-profile", middlewares_1.authMiddleware, (req, res, next) => accountController.updateAccount(req, res, next));
exports.default = accountRouter;
//# sourceMappingURL=account.router.js.map