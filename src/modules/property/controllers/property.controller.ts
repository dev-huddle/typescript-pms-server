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

    async fetchAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const response = await this.propertyService.fetchAll({})

            Res({
                res,
                code: StatusCodes.OK,
                message: "successfully fetched all properties",
                data: response,
            });
        } catch(err){
            next(err)
        }
    }

    async fetchOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params;

            const response = await this.propertyService.fetchOne({property_id: id})

            Res({
                res,
                code: StatusCodes.OK,
                message: "successfully fetched property",
                data: response,
            });
        } catch(err){
            next(err)
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params;

            await this.propertyService.delete({property_id: id})

            Res({
                res,
                code: StatusCodes.NO_CONTENT,
                message: "successfully fetched property",
            });
        } catch(err){
            next(err)
        }
    }
}