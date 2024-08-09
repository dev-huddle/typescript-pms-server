import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { HotelAmenityService } from "../services";

@injectable()
export default class HotelAmenityController {
  constructor(private hotelAmenityService: HotelAmenityService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, hotel_id } = req.body;
      const { files } = req;

      const response = await this.hotelAmenityService.create({
        title,
        description,
        hotel_id,
        files,
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "Successfully created hotel amenity",
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
      const response = await this.hotelAmenityService.fetchAll();

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched all hotel amenities",
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

      const response = await this.hotelAmenityService.fetchOne({
        amenity_id: id,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched hotel amenity",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, files } = req.body;

      const response = await this.hotelAmenityService.update({
        amenity_id: id,
        title,
        description,
        files,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully updated hotel amenity",
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

      await this.hotelAmenityService.delete({ amenity_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully deleted hotel amenity",
      });
    } catch (err) {
      next(err);
    }
  }
}
