import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { HotelBookingService } from "../services";

@injectable()
export default class HotelBookingController {
  constructor(private hotelBookingService: HotelBookingService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { guest_id, room_id, check_in_date, check_out_date, status, amount } = req.body;

      const response = await this.hotelBookingService.create({
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        status,
        amount,
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
      const response = await this.hotelBookingService.fetchAll();

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

      const response = await this.hotelBookingService.fetchOne({ booking_id: id });

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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelBookingService.update({
        booking_id: id,
        ...req.body,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully updated hotel booking",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await this.hotelBookingService.delete({ booking_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully deleted hotel booking",
      });
    } catch (err) {
      next(err);
    }
  }
}
