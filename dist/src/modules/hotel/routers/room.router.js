"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelRoomRouter = (0, express_1.Router)();
const hotelRoomController = tsyringe_1.container.resolve(controllers_1.HotelRoomController);
hotelRoomRouter.post("/create", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelRoomController.create(req, res, next));
hotelRoomRouter.patch("/", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelRoomController.update(req, res, next));
hotelRoomRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelRoomController.fetchAll(req, res, next));
hotelRoomRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelRoomController.fetchOne(req, res, next));
hotelRoomRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelRoomController.deleteOne(req, res, next));
exports.default = hotelRoomRouter;
//# sourceMappingURL=room.router.js.map