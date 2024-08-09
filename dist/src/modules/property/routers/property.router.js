"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const propertyRouter = (0, express_1.Router)();
const propertyController = tsyringe_1.container.resolve(controllers_1.PropertyController);
propertyRouter.post("/create", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => propertyController.create(req, res, next));
propertyRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => propertyController.fetchAll(req, res, next));
propertyRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => propertyController.fetchOne(req, res, next));
propertyRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => propertyController.deleteOne(req, res, next));
exports.default = propertyRouter;
//# sourceMappingURL=property.router.js.map