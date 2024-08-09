import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { HotelOrderService } from "../services";

@injectable()
export default class HotelOrderController {
  constructor(private hotelOrderService: HotelOrderService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { guest_id, room_id, items, total_amount, status } = req.body;

      const response = await this.hotelOrderService.create({
        guest_id,
        room_id,
        items,
        total_amount,
        status,
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "Successfully created hotel order",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.hotelOrderService.fetchAll();

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched all hotel orders",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelOrderService.fetchOne({ order_id: id });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched hotel order",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelOrderService.update({
        order_id: id,
        ...req.body,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully updated hotel order",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await this.hotelOrderService.delete({ order_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully deleted hotel order",
      });
    } catch (err) {
      next(err);
    }
  }
}
