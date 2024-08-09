import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelRoomController } from "../controllers";
import { authMiddleware, fileMiddleware } from "../../../shared/middlewares";

const hotelRoomRouter = Router();
const hotelRoomController = container.resolve(HotelRoomController);

hotelRoomRouter.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomController.create(req, res, next),
);

hotelRoomRouter.patch(
  "/",
  authMiddleware,
  fileMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomController.update(req, res, next),
);

hotelRoomRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomController.fetchAll(req, res, next),
);

hotelRoomRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomController.fetchOne(req, res, next),
);

hotelRoomRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelRoomController.deleteOne(req, res, next),
);

export default hotelRoomRouter;
