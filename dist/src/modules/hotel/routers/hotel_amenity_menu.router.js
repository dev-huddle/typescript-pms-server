"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../shared/middlewares");
const hotelAmenityMenuRouter = (0, express_1.Router)();
const hotelAmenityMenuController = tsyringe_1.container.resolve(controllers_1.HotelAmenityMenuController);
hotelAmenityMenuRouter.post("/create", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelAmenityMenuController.create(req, res, next));
hotelAmenityMenuRouter.patch("/:id", middlewares_1.authMiddleware, middlewares_1.fileMiddleware, (req, res, next) => hotelAmenityMenuController.update(req, res, next));
hotelAmenityMenuRouter.get("/", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityMenuController.fetchAll(req, res, next));
hotelAmenityMenuRouter.get("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityMenuController.fetchOne(req, res, next));
hotelAmenityMenuRouter.delete("/:id", middlewares_1.authMiddleware, (req, res, next) => hotelAmenityMenuController.deleteOne(req, res, next));
exports.default = hotelAmenityMenuRouter;
//# sourceMappingURL=hotel_amenity_menu.router.js.map