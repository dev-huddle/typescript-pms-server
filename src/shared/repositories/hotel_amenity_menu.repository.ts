import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { HotelAmenityMenu } from "../entities";

@injectable()
export default class HotelAmenityMenuRepository implements IRepository<HotelAmenityMenu> {
    constructor(){
        
    }
    create(args: HotelAmenityMenu): Promise<HotelAmenityMenu> {
        throw new Error("Method not implemented.");
    }
    fetchAll(): Promise<HotelAmenityMenu[]> {
        throw new Error("Method not implemented.");
    }
    fetchAllByAmenityId(amenity_id: string): Promise<HotelAmenityMenu[]> {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id: string): Promise<HotelAmenityMenu | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, update: Partial<HotelAmenityMenu>): Promise<HotelAmenityMenu | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<DeleteOutput> {
        throw new Error("Method not implemented.");
    }
}