import { injectable } from "tsyringe";
import {
  CreateHotelAmenityInput,
  CreateHotelAmenityOutput,
  DeleteHotelAmenityInput,
  DeleteHotelAmenityOutput,
  FetchAllHotelAmenityOutput,
  FetchOneHotelAmenityInput,
  FetchOneHotelAmenityOutput,
  UpdateHotelAmenityInput,
  UpdateHotelAmenityOutput,
} from "../dto";
import { BadRequestError } from "../../../shared/errors";
import { Database } from "../../../shared/facade";
import { HotelAmenityMedia } from "../../../shared/entities/hotel_amenities.entity";
import { HotelAmenityRepository } from "../../../shared/repositories";

@injectable()
export default class HotelAmenityService {
  constructor(
    private amenityRepository: HotelAmenityRepository,
    private database: Database,
  ) {}

  // Create a new hotel amenity
  async create(args: CreateHotelAmenityInput): Promise<CreateHotelAmenityOutput> {
    const { title, description, hotel_id, files } = args;

    let medias: HotelAmenityMedia[] = [];

    // Process media files
    if (files?.length) {
      files.map(async (file: any) => {
        medias.push({
          title: file ? file.fieldname : "",
          key: file ? file.key : "",
        });
      });
    }

    // Create the hotel amenity
    const data = await this.amenityRepository.create({
      title,
      description,
      hotel_id: await this.database.convertStringToObjectId(hotel_id),
      medias: medias.length ? medias : [],
    });

    if (!data) {
      throw new BadRequestError("Failed to save hotel amenity");
    }

    return {
      is_created: true,
    };
  }

  async fetchAll(): Promise<FetchAllHotelAmenityOutput> {
    const data = await this.amenityRepository.fetchAll();

    if (!data) {
      throw new BadRequestError("Failed to fetch hotel amenities");
    }

    return {
      amenities: data,
    };
  }

  async fetchOne(
    args: FetchOneHotelAmenityInput,
  ): Promise<FetchOneHotelAmenityOutput> {
    const { amenity_id } = args;

    const data = await this.amenityRepository.fetchOneById(amenity_id);

    if (!data) {
      throw new BadRequestError("Failed to fetch hotel amenity");
    }

    return {
      amenity: data,
    };
  }

  async update(
    args: UpdateHotelAmenityInput,
  ): Promise<UpdateHotelAmenityOutput> {
    const { title, description, files, amenity_id } = args;

    let medias: HotelAmenityMedia[] = [];

    if (files?.length) {
      files.map(async (file: any) => {
        medias.push({
          title: file ? file.fieldname : "",
          key: file ? file.key : "",
        });
      });
    }

    const updatedAmenity = await this.amenityRepository.update(amenity_id, {
      title,
      description,
      medias: medias.length ? medias : [],
    });

    if (!updatedAmenity) {
      throw new BadRequestError("Failed to update hotel amenity");
    }

    return {
      is_updated: true,
    };
  }

  async delete(
    args: DeleteHotelAmenityInput,
  ): Promise<DeleteHotelAmenityOutput> {
    const { amenity_id } = args;

    const response = await this.amenityRepository.delete(amenity_id);

    if (!response) {
      throw new BadRequestError("Failed to delete hotel amenity");
    }

    return {
      is_deleted: true,
    };
  }
}
