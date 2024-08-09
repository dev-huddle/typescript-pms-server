import { injectable } from "tsyringe";
import { BadRequestError } from "../../../shared/errors";
import { HotelAmenityMenuRepository } from "../../../shared/repositories";
import {
  CreateHotelAmenityMenuInput,
  CreateHotelAmenityMenuOutput,
  DeleteHotelAmenityMenuInput,
  DeleteHotelAmenityMenuOutput,
  FetchAllHotelAmenityMenuInput,
  FetchAllHotelAmenityMenuOutput,
  FetchOneHotelAmenityMenuInput,
  FetchOneHotelAmenityMenuOutput,
  UpdateHotelAmenityMenuInput,
  UpdateHotelAmenityMenuOutput,
} from "../dto";
import { Database } from "../../../shared/facade";
import { HotelAmenityStatus } from "../../../shared/constants";
import { HotelAmenityMenuMedia } from "../../../shared/entities";

@injectable()
export default class HotelAmenityMenuService {
  constructor(
    private hotelAmenityMenuRepository: HotelAmenityMenuRepository,
    private database: Database
  ) {}

  async create(args: CreateHotelAmenityMenuInput): Promise<CreateHotelAmenityMenuOutput> {
    const { amenity_id, name, description, amount, quantity, status, medias } = args;

    let media_files: HotelAmenityMenuMedia[] = [];

    // Process media files
    if (medias?.length) {
      medias.map(async (file: any) => {
        media_files.push({
          title: file ? file.fieldname : "",
          key: file ? file.key : "",
        });
      });
    }

    const response = await this.hotelAmenityMenuRepository.create({
      amenity_id: await this.database.convertStringToObjectId(amenity_id),
      name,
      description,
      amount,
      quantity,
      status: status as HotelAmenityStatus,
      medias: media_files || [],
    });

    if (!response) {
      throw new BadRequestError("Failed to create amenity menu");
    }

    return {
      is_created: true,
    };
  }

  async fetchAll(args: FetchAllHotelAmenityMenuInput): Promise<FetchAllHotelAmenityMenuOutput> {
    const { amenity_id } = args;

    const response = await this.hotelAmenityMenuRepository.fetchAllByAmenityId(amenity_id);

    return {
      menus: response,
    };
  }

  async fetchOne(
    args: FetchOneHotelAmenityMenuInput,
  ): Promise<FetchOneHotelAmenityMenuOutput> {
    const { menu_id } = args;

    const response = await this.hotelAmenityMenuRepository.fetchOneById(menu_id);

    if (!response) {
      throw new BadRequestError("Amenity menu not found");
    }

    return {
      menu: response,
    };
  }

  async update(
    args: UpdateHotelAmenityMenuInput,
  ): Promise<UpdateHotelAmenityMenuOutput> {
    const { menu_id, name, description, amount, quantity, status, medias } = args;

    const updateMenu = await this.hotelAmenityMenuRepository.update(menu_id, {
      name,
      description,
      amount,
      quantity,
      status: status as HotelAmenityStatus,
      medias,
    });

    if (!updateMenu) {
      throw new BadRequestError("Failed to update amenity menu");
    }

    return {
      is_updated: true,
    };
  }

  async delete(
    args: DeleteHotelAmenityMenuInput,
  ): Promise<DeleteHotelAmenityMenuOutput> {
    const { menu_id } = args;

    const response = await this.hotelAmenityMenuRepository.delete(menu_id);

    if (!response) {
      throw new BadRequestError("Failed to delete amenity menu");
    }

    return {
      is_deleted: true,
    };
  }
}
