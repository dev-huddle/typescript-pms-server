import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { RoomService } from "../services";

@injectable()
export default class HotelRoomController {
  constructor(private roomService: RoomService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { files } = req;

      const { hotel_id, number, room_type_id, status } = req.body;

      const response = await this.roomService.create({
        number,
        room_type_id,
        status,
        hotel_id,
        files,
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "successfully created room",
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
      const response = await this.roomService.fetchAll();

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully fetched all rooms",
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

      const response = await this.roomService.fetchOne({ room_id: id });

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully fetched room",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.roomService.update({
        ...req.body,
        hotel_id: id,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "successfully updated room",
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

      await this.roomService.delete({ room_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "successfully deleted room",
      });
    } catch (err) {
      next(err);
    }
  }
}
