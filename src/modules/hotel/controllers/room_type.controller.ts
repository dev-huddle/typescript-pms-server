import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { RoomTypeService } from "../services";

@injectable()
export default class HotelRoomTypeController {
  constructor(private roomTypeService: RoomTypeService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, amount, discount_amount, hotel_id } =
        req.body;

      const response = await this.roomTypeService.create({
        title,
        description,
        amount,
        discount_amount,
        hotel_id,
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "successfully created room type",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await this.roomTypeService.fetchAll();

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully fetched all room types",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.roomTypeService.fetchOne({
        room_type_id: id,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully fetched room type",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.roomTypeService.update({
        ...req.body,
        hotel_id: id,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully fetched room type",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await this.roomTypeService.delete({ hotel_room_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "successfully fetched room type",
      });
    } catch (err) {
      next(err);
    }
  }
}
