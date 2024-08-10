import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { CustomerHotelBookingService } from "../services";

@injectable()
export default class CustomerHotelBookingController {
  constructor(private hotelBookingService: CustomerHotelBookingService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { guest_id, room_id, check_in_date, check_out_date, amount } = req.body;

      const response = await this.hotelBookingService.createBooking({
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        amount
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "Successfully created hotel booking",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.hotelBookingService.fetchAllBookings;

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched all hotel bookings",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelBookingService.fetchBooking(id);

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched hotel booking",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await this.hotelBookingService.cancel({ booking_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully cancel hotel booking",
      });
    } catch (err) {
      next(err);
    }
  }

  async changeDate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const { check_in_date, check_out_date } = req.body;

      await this.hotelBookingService.changeDate({ booking_id: id, check_in_date, check_out_date });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully change hotel booking date",
      });
    } catch (err) {
      next(err);
    }
  }
}
