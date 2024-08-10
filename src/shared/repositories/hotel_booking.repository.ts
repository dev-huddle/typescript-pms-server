import { injectable } from "tsyringe";
import { HotelBooking } from "../entities";
import { DeleteOutput, IRepository } from "../interfaces";

@injectable()
export default class HotelBookingRepository implements IRepository<HotelBooking> {
    constructor(){
        
    }
    create(args: HotelBooking): Promise<HotelBooking> {
        throw new Error("Method not implemented.");
    }
    fetchAll(): Promise<HotelBooking[]> {
        throw new Error("Method not implemented.");
    }
    fetchAllByBookee(bookee_id: string): Promise<HotelBooking[]> {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id: string): Promise<HotelBooking | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, update: Partial<HotelBooking>): Promise<HotelBooking | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<DeleteOutput> {
        throw new Error("Method not implemented.");
    }
}