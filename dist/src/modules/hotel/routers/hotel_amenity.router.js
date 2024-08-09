"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelAmenityRouter = (0, express_1.Router)();
const hotelAmenityController = tsyringe_1.container.resolve(controllers_1.HotelAmenityController);
hotelAmenityRouter.post("/create", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelAmenityController.create(req, res, next));
hotelAmenityRouter.patch("/", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelAmenityController.update(req, res, next));
hotelAmenityRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityController.fetchAll(req, res, next));
hotelAmenityRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityController.fetchOne(req, res, next));
hotelAmenityRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityController.deleteOne(req, res, next));
exports.default = hotelAmenityRouter;
//# sourceMappingURL=hotel_amenity.router.js.map