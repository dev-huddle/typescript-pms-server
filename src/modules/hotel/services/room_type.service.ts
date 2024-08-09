import { injectable } from "tsyringe";
import {
  CreateTypeInput,
  CreateTypeOutput,
  DeleteHotelRoomTypeInput,
  DeleteHotelRoomTypeOutput,
  FetchAllHotelRoomTypeOutput,
  FetchOneHotelRoomTypeInput,
  FetchOneHotelRoomTypeOutput,
  UpdateHotelRoomTypeInput,
  UpdateHotelRoomTypeOutput,
} from "../dto";
import { HotelRoomTypeRepository } from "../../../shared/repositories";
import { BadRequestError } from "../../../shared/errors";
import { Database } from "../../../shared/facade";

@injectable()
export default class RoomTypeService {
  constructor(
    private roomTypeRepository: HotelRoomTypeRepository,
    private database: Database,
  ) {}

  async create(args: CreateTypeInput): Promise<CreateTypeOutput> {
    const { title, description, amount, discount_amount, hotel_id } = args;

    const data = await this.roomTypeRepository.create({
      title,
      description,
      amount,
      discount_amount: discount_amount ? discount_amount : "",
      hotel_id: await this.database.convertStringToObjectId(hotel_id),
    });

    if (!data) {
      throw new BadRequestError("failed to save room type");
    }

    return {
      is_created: true,
    };
  }

  async fetchAll(): Promise<FetchAllHotelRoomTypeOutput> {
    const data = await this.roomTypeRepository.fetchAll();

    if (!data) {
      throw new BadRequestError("failed to fetch room types");
    }

    return {
      room_types: data,
    };
  }

  async fetchOne(
    args: FetchOneHotelRoomTypeInput,
  ): Promise<FetchOneHotelRoomTypeOutput> {
    const { room_type_id } = args;

    const data = await this.roomTypeRepository.fetchOneById(room_type_id);

    if (!data) {
      throw new BadRequestError("failed to fetch property");
    }

    return {
      room_type: data,
    };
  }

  async update(
    args: UpdateHotelRoomTypeInput,
  ): Promise<UpdateHotelRoomTypeOutput> {
    const { title, description, amount, discount_amount, hotel_id } = args;

    const updateRoomType = await this.roomTypeRepository.update(hotel_id, {
      title,
      description,
      amount,
      discount_amount,
    });

    if (!updateRoomType) {
      throw new BadRequestError("failed to update room type");
    }

    return {
      is_updated: true,
    };
  }

  async delete(
    args: DeleteHotelRoomTypeInput,
  ): Promise<DeleteHotelRoomTypeOutput> {
    const { hotel_room_id } = args;

    const response = await this.roomTypeRepository.delete(hotel_room_id);

    if (!response) {
      throw new BadRequestError("failed to delete hotel room type");
    }

    return {
      is_deleted: true,
    };
  }
}
