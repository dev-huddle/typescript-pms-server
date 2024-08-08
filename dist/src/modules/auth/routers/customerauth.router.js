"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const customerAuthRouter = (0, express_1.Router)();
const customerAuthController = tsyringe_1.container.resolve(controllers_1.CustomerAuthController);
customerAuthRouter.post("/signup", (req, res, next) => customerAuthController.signUp(req, res, next));
customerAuthRouter.post("/confirm-signup", (req, res, next) => customerAuthController.confirmSignUp(req, res, next));
customerAuthRouter.post("/resend-code", (req, res, next) => customerAuthController.resendSignupConfirmationCode(req, res, next));
customerAuthRouter.post("/signin", (req, res, next) => customerAuthController.signIn(req, res, next));
customerAuthRouter.post("/signout", (req, res, next) => customerAuthController.signOut(req, res, next));
customerAuthRouter.post("/forgotpassword", (req, res, next) => customerAuthController.forgotpassword(req, res, next));
customerAuthRouter.post("/confirm-forgotpassword", (req, res, next) => customerAuthController.confirmForgotpassword(req, res, next));
exports.default = customerAuthRouter;
//# sourceMappingURL=customerauth.router.js.map