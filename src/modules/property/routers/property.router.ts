import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { PropertyController } from "../controllers";
import { authMiddleware } from "../../../shared/middlewares";

const propertyRouter = Router();
const propertyController = container.resolve(PropertyController);

propertyRouter.post(
  "/create",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    propertyController.create(req, res, next),
);

export default propertyRouter;
