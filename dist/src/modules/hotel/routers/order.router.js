"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelOrderRouter = (0, express_1.Router)();
const hotelOrderController = tsyringe_1.container.resolve(controllers_1.HotelOrderController);
hotelOrderRouter.post("/create", middlewares_1.authMiddleware, (req, res, next) => hotelOrderController.create(req, res, next));
hotelOrderRouter.patch("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelOrderController.update(req, res, next));
hotelOrderRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelOrderController.fetchAll(req, res, next));
hotelOrderRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelOrderController.fetchOne(req, res, next));
hotelOrderRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelOrderController.deleteOne(req, res, next));
exports.default = hotelOrderRouter;
//# sourceMappingURL=order.router.js.map