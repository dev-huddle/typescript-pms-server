import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { HotelOrderController } from "../controllers";
import { authMiddleware } from "../../../shared/middlewares";

const hotelOrderRouter = Router();
const hotelOrderController = container.resolve(HotelOrderController);

hotelOrderRouter.post(
  "/create",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelOrderController.create(req, res, next),
);

hotelOrderRouter.patch(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelOrderController.update(req, res, next),
);

hotelOrderRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelOrderController.fetchAll(req, res, next),
);

hotelOrderRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelOrderController.fetchOne(req, res, next),
);

hotelOrderRouter.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    hotelOrderController.deleteOne(req, res, next),
);

export default hotelOrderRouter;
