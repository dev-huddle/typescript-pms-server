import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { Res } from "../../../shared/helper";
import { StatusCodes } from "../../../shared/constants";
import { PropertyService } from "../services";

@injectable()
export default class PropertyController {
    constructor(
        private propertyService: PropertyService
    ){

    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { files } = req;

            const { sub } = req.user;

            const {address, type, name} = req.body;

            const response = await this.propertyService.create({
                name,
                creator_id: sub,
                address,
                type,
                files
            })

            Res({
                res,
                code: StatusCodes.CREATED,
                message: "successfully created property",
                data: response,
            });
        } catch(err){
            next(err)
        }
    }
}