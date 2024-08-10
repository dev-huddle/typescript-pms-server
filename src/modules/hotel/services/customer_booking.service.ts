import { injectable } from "tsyringe";
import {
  CreateHotelBookingInput,
  CreateHotelBookingOutput,
  ChangeDateHotelBookingInput,
  ChangeDateHotelBookingOutput,
  FetchAllHotelBookingOutput,
  FetchOneHotelBookingOutput,
  CancelHotelBookingInput,
  CancelHotelBookingOutput,
} from "../dto";
import { HotelBookingRepository, UserRepository } from "../../../shared/repositories";
import { Database } from "../../../shared/facade";
import { HotelBookingService } from ".";
import { BadRequestError } from "../../../shared/errors";

@injectable()
export class CustomerHotelBookingService extends HotelBookingService {
  constructor(
    private customerHotelBookingRepository: HotelBookingRepository,
    private userRepository: UserRepository,
    private customerDatabase: Database
  ) {
    super(customerHotelBookingRepository, customerDatabase);
  }

  // Method for customers to create a hotel booking
  async createBooking(
    args: CreateHotelBookingInput
  ): Promise<CreateHotelBookingOutput> {
    // Add any customer-specific logic before calling the base class method

    // For example, we might want to check customer eligibility for booking, etc.
    // TODO: Add customer-specific validation or checks here

    return super.create(args);
  }

  // Method for customers to request a change of date for their booking
  async requestChangeDate(
    args: ChangeDateHotelBookingInput
  ): Promise<ChangeDateHotelBookingOutput> {
    // Add any customer-specific logic before calling the base class method

    // For example, we could check if the new dates are available, or send a confirmation email
    // TODO: Add customer-specific validation or checks here

    return super.changeDate(args);
  }


  async cancel(args: CancelHotelBookingInput): Promise<CancelHotelBookingOutput> {
    return super.cancel(args);
  }

  async fetchAllBookings(aws_id: string): Promise<FetchAllHotelBookingOutput> {
    const user = await this.userRepository.fetchOneByCognitoId(aws_id)
    const response = await this.customerHotelBookingRepository.fetchAllByBookee(user?._id!);

    if(!response){
        throw new BadRequestError("failed to fetch all bookings")
    }

    return {
      bookings: response,
    };
  }

  async fetchBooking(booking_id: string): Promise<FetchOneHotelBookingOutput> {
    return super.fetchOne({
        booking_id
    });
  }
  
}
