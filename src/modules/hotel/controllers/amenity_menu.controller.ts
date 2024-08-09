import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { HotelAmenityMenuService } from "../services";

@injectable()
export default class HotelAmenityMenuController {
  constructor(private hotelAmenityMenuService: HotelAmenityMenuService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { amenity_id, name, description, amount, quantity, status } = req.body;

      const { files } = req;

      const response = await this.hotelAmenityMenuService.create({
        amenity_id,
        name,
        description,
        amount,
        quantity,
        status,
        medias: files,
      });

      Res({
        res,
        code: StatusCodes.CREATED,
        message: "Successfully created amenity menu",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { amenity_id } = req.query;

      const response = await this.hotelAmenityMenuService.fetchAll({ amenity_id: String(amenity_id) });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched all amenity menus",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelAmenityMenuService.fetchOne({ menu_id: id });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully fetched amenity menu",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const response = await this.hotelAmenityMenuService.update({
        menu_id: id,
        ...req.body,
      });

      Res({
        res,
        code: StatusCodes.OK,
        message: "Successfully updated amenity menu",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await this.hotelAmenityMenuService.delete({ menu_id: id });

      Res({
        res,
        code: StatusCodes.NO_CONTENT,
        message: "Successfully deleted amenity menu",
      });
    } catch (err) {
      next(err);
    }
  }
}
