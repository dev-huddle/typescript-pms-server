import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelBookingController } from "../controllers";
import { authMiddleware } from "../../../shared/middlewares";

const hotelBookingRouter = Router();
const hotelBookingController = container.resolve(HotelBookingController);

hotelBookingRouter.post(
  "/create",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.create(req, res, next),
);

hotelBookingRouter.patch(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.update(req, res, next),
);

hotelBookingRouter.patch(
  "/cancel/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.cancel(req, res, next),
);

hotelBookingRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.fetchAll(req, res, next),
);

hotelBookingRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.fetchOne(req, res, next),
);

hotelBookingRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelBookingController.deleteOne(req, res, next),
);

export default hotelBookingRouter;
