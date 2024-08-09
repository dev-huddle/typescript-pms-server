import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelAmenityMenuController } from "../controllers";
import { authMiddleware, fileMiddleware } from "../../../shared/middlewares";

const hotelAmenityMenuRouter = Router();
const hotelAmenityMenuController = container.resolve(HotelAmenityMenuController);

hotelAmenityMenuRouter.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityMenuController.create(req, res, next),
);

hotelAmenityMenuRouter.patch(
  "/:id",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityMenuController.update(req, res, next),
);

hotelAmenityMenuRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityMenuController.fetchAll(req, res, next),
);

hotelAmenityMenuRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityMenuController.fetchOne(req, res, next),
);

hotelAmenityMenuRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityMenuController.deleteOne(req, res, next),
);

export default hotelAmenityMenuRouter;
