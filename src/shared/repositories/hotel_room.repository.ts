import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { HotelRoom } from "../entities";

@injectable()
export default class HotelRoomRepository implements IRepository<HotelRoom> {
  constructor() {}
  create(args: HotelRoom): Promise<HotelRoom> {
    throw new Error("Method not implemented.");
  }
  fetchAll(): Promise<HotelRoom[]> {
    throw new Error("Method not implemented.");
  }
  fetchOneById(id: string): Promise<HotelRoom | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, update: Partial<HotelRoom>): Promise<HotelRoom | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<DeleteOutput> {
    throw new Error("Method not implemented.");
  }
}
