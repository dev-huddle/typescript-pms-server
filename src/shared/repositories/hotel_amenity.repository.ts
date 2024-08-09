import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { HotelAmenity } from "../entities";

@injectable()
export default class HotelAmenityRepository implements IRepository<HotelAmenity> {
    constructor(){
        
    }
    create(args: HotelAmenity): Promise<HotelAmenity> {
        throw new Error("Method not implemented.");
    }
    fetchAll(): Promise<HotelAmenity[]> {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id: string): Promise<HotelAmenity | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, update: Partial<HotelAmenity>): Promise<HotelAmenity | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<DeleteOutput> {
        throw new Error("Method not implemented.");
    }
}