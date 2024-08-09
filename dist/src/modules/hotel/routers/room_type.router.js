"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelRoomTypeRouter = (0, express_1.Router)();
const hotelRoomTypeController = tsyringe_1.container.resolve(controllers_1.HotelRoomTypeController);
hotelRoomTypeRouter.post("/create", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelRoomTypeController.create(req, res, next));
hotelRoomTypeRouter.patch("/", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelRoomTypeController.update(req, res, next));
hotelRoomTypeRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelRoomTypeController.fetchAll(req, res, next));
hotelRoomTypeRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelRoomTypeController.fetchOne(req, res, next));
hotelRoomTypeRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelRoomTypeController.deleteOne(req, res, next));
exports.default = hotelRoomTypeRouter;
//# sourceMappingURL=room_type.router.js.map