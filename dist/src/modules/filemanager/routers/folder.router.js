"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const express_1 = require("express");
const middlewares_1 = require("../../../shared/middlewares");
const folderRouter = (0, express_1.Router)();
const folderController = tsyringe_1.container.resolve(controllers_1.FolderController);
folderRouter.post("/create", middlewares_1.authMiddleware, (req, res, next) => folderController.create(req, res, next));
folderRouter.patch("/rename", middlewares_1.authMiddleware, (req, res, next) => folderController.rename(req, res, next));
folderRouter.patch("/move", middlewares_1.authMiddleware, (req, res, next) => folderController.move(req, res, next));
folderRouter.patch("/copy", middlewares_1.authMiddleware, (req, res, next) => folderController.copy(req, res, next));
folderRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => folderController.delete(req, res, next));
exports.default = folderRouter;
//# sourceMappingURL=folder.router.js.map