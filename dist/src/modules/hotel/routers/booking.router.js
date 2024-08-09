"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelBookingRouter = (0, express_1.Router)();
const hotelBookingController = tsyringe_1.container.resolve(controllers_1.HotelBookingController);
hotelBookingRouter.post("/create", middlewares_1.authMiddleware, (req, res, next) => hotelBookingController.create(req, res, next));
hotelBookingRouter.patch("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelBookingController.update(req, res, next));
hotelBookingRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelBookingController.fetchAll(req, res, next));
hotelBookingRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelBookingController.fetchOne(req, res, next));
hotelBookingRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelBookingController.deleteOne(req, res, next));
exports.default = hotelBookingRouter;
//# sourceMappingURL=booking.router.js.map