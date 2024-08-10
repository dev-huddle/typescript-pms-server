import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import { CustomerHotelBookingController } from "../controllers";
import { authMiddleware } from "../../../shared/middlewares";

const customerHotelBookingRouter = Router();
const customerHotelBookingController = container.resolve(CustomerHotelBookingController);

customerHotelBookingRouter.post(
  "/create",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    customerHotelBookingController.create(req, res, next),
);

customerHotelBookingRouter.patch(
  "/cancel/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    customerHotelBookingController.cancel(req, res, next),
);

customerHotelBookingRouter.patch(
  "/change_date/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    customerHotelBookingController.changeDate(req, res, next),
);

customerHotelBookingRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    customerHotelBookingController.fetchAll(req, res, next),
);

customerHotelBookingRouter.get(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    customerHotelBookingController.fetchOne(req, res, next),
);


export default customerHotelBookingRouter;
