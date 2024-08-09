import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelAmenityController } from "../controllers";
import { authMiddleware, fileMiddleware } from "../../../shared/middlewares";

const hotelAmenityRouter = Router();
const hotelAmenityController = container.resolve(HotelAmenityController);

hotelAmenityRouter.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityController.create(req, res, next),
);

hotelAmenityRouter.patch(
  "/",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityController.update(req, res, next),
);

hotelAmenityRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityController.fetchAll(req, res, next),
);

hotelAmenityRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityController.fetchOne(req, res, next),
);

hotelAmenityRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelAmenityController.deleteOne(req, res, next),
);

export default hotelAmenityRouter;
