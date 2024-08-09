import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { HotelRoomType } from "../entities";

@injectable()
export default class HotelRoomTypeRepository
  implements IRepository<HotelRoomType>
{
  constructor() {}
  create(args: HotelRoomType): Promise<HotelRoomType> {
    throw new Error("Method not implemented.");
  }
  fetchAll(): Promise<HotelRoomType[]> {
    throw new Error("Method not implemented.");
  }
  fetchOneById(id: string): Promise<HotelRoomType | null> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    update: Partial<HotelRoomType>,
  ): Promise<HotelRoomType | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<DeleteOutput> {
    throw new Error("Method not implemented.");
  }
}
