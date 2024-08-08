"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const tsyringe_1 = require("tsyringe");
const middlewares_1 = require("../../../shared/middlewares");
const fileManagerRouter = (0, express_1.Router)();
const fileManagerController = tsyringe_1.container.resolve(controllers_1.FileManagerController);
fileManagerRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => fileManagerController.getAllObjects(req, res, next));
fileManagerRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => fileManagerController.deleteObject(req, res, next));
fileManagerRouter.delete("/", middlewares_1.authMiddleware, (req, res, next) => fileManagerController.deleteManyObject(req, res, next));
exports.default = fileManagerRouter;
//# sourceMappingURL=filemanager.router.js.map