import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelRoomTypeController } from "../controllers";
import { authMiddleware, fileMiddleware } from "../../../shared/middlewares";

const hotelRoomTypeRouter = Router();
const hotelRoomTypeController = container.resolve(HotelRoomTypeController);

hotelRoomTypeRouter.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomTypeController.create(req, res, next),
);

hotelRoomTypeRouter.patch(
  "/",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomTypeController.update(req, res, next),
);

hotelRoomTypeRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomTypeController.fetchAll(req, res, next),
);

hotelRoomTypeRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomTypeController.fetchOne(req, res, next),
);

hotelRoomTypeRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomTypeController.deleteOne(req, res, next),
);

export default hotelRoomTypeRouter;
