"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controller_1 = require("../controller");
const middlewares_1 = require("../../../shared/middlewares");
const cardRouter = (0, express_1.Router)();
const cardController = tsyringe_1.container.resolve(controller_1.CardController);
cardRouter.post("/authorize-add-card", middlewares_1.authMiddleware, (req, res, next) => cardController.authorizeAddCard(req, res, next));
exports.default = cardRouter;
//# sourceMappingURL=card.router.js.map