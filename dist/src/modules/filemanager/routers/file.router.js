"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const express_1 = require("express");
const middlewares_1 = require("../../../shared/middlewares");
const fileRouter = (0, express_1.Router)();
const fileController = tsyringe_1.container.resolve(controllers_1.FileController);
fileRouter.post("/upload", middlewares_1.authMiddleware, middlewares_1.fileMiddleware.array("files"), (req, res, next) => fileController.upload(req, res, next));
fileRouter.patch("/move", middlewares_1.authMiddleware, (req, res, next) => fileController.move(req, res, next));
fileRouter.patch("/rename", middlewares_1.authMiddleware, (req, res, next) => fileController.rename(req, res, next));
fileRouter.patch("/copy", middlewares_1.authMiddleware, (req, res, next) => fileController.copy(req, res, next));
exports.default = fileRouter;
//# sourceMappingURL=file.router.js.map