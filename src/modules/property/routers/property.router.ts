import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { PropertyController } from "../controllers";
import { authMiddleware, fileMiddleware } from "../../../shared/middlewares";

const propertyRouter = Router();
const propertyController = container.resolve(PropertyController);

propertyRouter.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    propertyController.create(req, res, next),
);

propertyRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    propertyController.fetchAll(req, res, next),
);

propertyRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    propertyController.fetchOne(req, res, next),
);

propertyRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    propertyController.deleteOne(req, res, next),
);

export default propertyRouter;
