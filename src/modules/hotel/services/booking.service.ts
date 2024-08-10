import { injectable } from "tsyringe";
import { BadRequestError } from "../../../shared/errors";
import { HotelBookingRepository } from "../../../shared/repositories";
import {
  CancelHotelBookingInput,
  CancelHotelBookingOutput,
  ChangeDateHotelBookingInput,
  ChangeDateHotelBookingOutput,
  CreateHotelBookingInput,
  CreateHotelBookingOutput,
  DeleteHotelBookingInput,
  DeleteHotelBookingOutput,
  FetchAllHotelBookingOutput,
  FetchOneHotelBookingInput,
  FetchOneHotelBookingOutput,
  UpdateHotelBookingInput,
  UpdateHotelBookingOutput,
} from "../dto";
import { HotelBookingStatus } from "../../../shared/constants";
import { Database } from "../../../shared/facade";

@injectable()
export default class HotelBookingService {
  constructor(
    private hotelBookingRepository: HotelBookingRepository,
    private database: Database
) {}

  async create(args: CreateHotelBookingInput): Promise<CreateHotelBookingOutput> {
    const { guest_id, room_id, check_in_date, check_out_date } = args;

    // convert mongoose objectid to string
    const bookee_id = await this.database.convertStringToObjectId(guest_id!);
    const hotel_room_id = await this.database.convertStringToObjectId(room_id!);

    // add hotel bookings to hotel bookings table
    const response = await this.hotelBookingRepository.create({
      bookee_id,
      hotel_room_id,
      check_in_date,
      check_out_date,
      status: HotelBookingStatus.UNCONFIRMED,
    });

    if (!response) {
      throw new BadRequestError("Failed to create hotel booking");
    }

    //TODO: create a transaction

    return {
      is_created: true,
      booking_id: response._id!,
    };
  }

  async fetchAll(): Promise<FetchAllHotelBookingOutput> {
    const response = await this.hotelBookingRepository.fetchAll();

    return {
      bookings: response,
    };
  }

  async fetchOne(args: FetchOneHotelBookingInput): Promise<FetchOneHotelBookingOutput> {
    const { booking_id } = args;

    const response = await this.hotelBookingRepository.fetchOneById(booking_id);

    if (!response) {
      throw new BadRequestError("Hotel booking not found");
    }

    return {
      booking: response,
    };
  }

  async update(args: UpdateHotelBookingInput): Promise<UpdateHotelBookingOutput> {
    const { booking_id, guest_id, room_id, check_in_date, check_out_date, status, amount_paid } = args;

    const updateBooking = await this.hotelBookingRepository.update(booking_id, {
      bookee_id: await this.database.convertStringToObjectId(guest_id!),
      hotel_room_id:  await this.database.convertStringToObjectId(room_id!),
      check_in_date,
      check_out_date,
      status: status as HotelBookingStatus,
    });

    if (!updateBooking) {
      throw new BadRequestError("Failed to update hotel booking");
    }

    return {
      is_updated: true,
    };
  }

  async delete(args: DeleteHotelBookingInput): Promise<DeleteHotelBookingOutput> {
    const { booking_id } = args;

    const response = await this.hotelBookingRepository.delete(booking_id);

    if (!response) {
      throw new BadRequestError("Failed to delete hotel booking");
    }

    return {
      is_deleted: true,
    };
  }

  async cancel(args: CancelHotelBookingInput): Promise<CancelHotelBookingOutput> {

    const { booking_id } = args;

    // TODO: add time checker to prevent irregular cancellation

    const response = await this.update({
      booking_id,
      status: HotelBookingStatus.CANCELLED
    });

    if(!response){
      throw new BadRequestError("failed to cancel hotel booking")
    }

    return {
      is_canceled: true
    }
  }

  async changeDate(args: ChangeDateHotelBookingInput): Promise<ChangeDateHotelBookingOutput> {

    const { booking_id, check_in_date, check_out_date } = args;

    // TODO: ensure new date doesnt overlap with someone else'sg 

    const response = await this.update({
      booking_id,
      check_in_date,
      check_out_date
    });

    if(!response){
      throw new BadRequestError("failed to change date for booking")
    }

    return {
      is_changed: true
    }
  }
}
