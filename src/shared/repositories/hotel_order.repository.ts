import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { HotelOrder } from "../entities";

@injectable()
export default class HotelOrderRepository implements IRepository<HotelOrder> {
    constructor(){
        
    }
    create(args: HotelOrder): Promise<HotelOrder> {
        throw new Error("Method not implemented.");
    }
    fetchAll(): Promise<HotelOrder[]> {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id: string): Promise<HotelOrder | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, update: Partial<HotelOrder>): Promise<HotelOrder | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<DeleteOutput> {
        throw new Error("Method not implemented.");
    }
}