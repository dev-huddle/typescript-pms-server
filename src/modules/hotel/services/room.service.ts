import { injectable } from "tsyringe";
import {
  HotelRoomRepository,
  UserRepository,
} from "../../../shared/repositories";
import { Database } from "../../../shared/facade";
import { BadRequestError } from "../../../shared/errors";
import {
  CreateHotelRoomInput,
  CreateHotelRoomOutput,
  DeleteHotelRoomInput,
  DeleteHotelRoomOutput,
  FetchAllHotelRoomInput,
  FetchAllHotelRoomOutput,
  FetchOneHotelRoomInput,
  FetchOneHotelRoomOutput,
  UpdateHotelRoomInput,
  UpdateHotelRoomOutput,
} from "../dto";
import { HotelRoomMedia } from "../../../shared/entities/hotel_room_inventory.entity";
@injectable()
export default class RoomService {
  constructor(
    private hotelRoomRepository: HotelRoomRepository,
    private userRepository: UserRepository,
    private database: Database,
  ) {}

  async create(args: CreateHotelRoomInput): Promise<CreateHotelRoomOutput> {
    const { hotel_id, room_type_id, number, status, files } = args;

    let thumbnail: HotelRoomMedia[] = [];

    // organize files to be saved
    if (files?.length) {
      (
        files as unknown as Array<
          { [fieldname: string]: File[] } | File[] | undefined
        >
      ).map(async (file: any) => {
        thumbnail.push({
          title: file ? file.fieldname : "",
          key: file ? file.key : "",
        });
      });
    }

    const response = await this.hotelRoomRepository.create({
      number,
      type: await this.database.convertStringToObjectId(room_type_id),
      status,
      hotel_id: await this.database.convertStringToObjectId(hotel_id),
      media: thumbnail ? thumbnail : [],
    });

    if (!response) {
      throw new BadRequestError("room has been created");
    }

    return {
      is_created: true,
    };
  }

  async fetchAll(): Promise<FetchAllHotelRoomOutput> {
    const response = await this.hotelRoomRepository.fetchAll();

    return {
      rooms: response,
    };
  }

  async fetchOne(
    args: FetchOneHotelRoomInput,
  ): Promise<FetchOneHotelRoomOutput> {
    const { room_id } = args;

    const response = await this.hotelRoomRepository.fetchOneById(room_id);

    if (!response) {
      throw new BadRequestError("room not found");
    }

    return {
      room: response,
    };
  }

  async delete(args: DeleteHotelRoomInput): Promise<DeleteHotelRoomOutput> {
    const { room_id } = args;

    const response = await this.hotelRoomRepository.delete(room_id);

    if (!response) {
      throw new BadRequestError("failed to delete hotel room");
    }

    return {
      is_deleted: true,
    };
  }

  async update(args: UpdateHotelRoomInput): Promise<UpdateHotelRoomOutput> {
    const { number, room_type_id, status, files, hotel_id } = args;

    const updateRoomType = await this.hotelRoomRepository.update(hotel_id, {
      number,
      status,
    });

    if (!updateRoomType) {
      throw new BadRequestError("failed to update room ");
    }

    return {
      is_updated: true,
    };
  }
}
