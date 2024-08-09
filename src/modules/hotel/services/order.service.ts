import { injectable } from "tsyringe";
import { BadRequestError } from "../../../shared/errors";
import { HotelOrderRepository } from "../../../shared/repositories";
import {
  CreateHotelOrderInput,
  CreateHotelOrderOutput,
  DeleteHotelOrderInput,
  DeleteHotelOrderOutput,
  FetchAllHotelOrderOutput,
  FetchOneHotelOrderInput,
  FetchOneHotelOrderOutput,
  UpdateHotelOrderInput,
  UpdateHotelOrderOutput,
} from "../dto";
import { HotelOrderStatus } from "../../../shared/constants";
import { Database } from "../../../shared/facade";

@injectable()
export default class HotelOrderService {
  constructor(
    private hotelOrderRepository: HotelOrderRepository,
    private database: Database
    ) {}

  async create(args: CreateHotelOrderInput): Promise<CreateHotelOrderOutput> {
    const { guest_id, items, total_amount, status } = args;

    const response = await this.hotelOrderRepository.create({
      guest_id: await this.database.convertStringToObjectId(guest_id),
      items,
      amount: total_amount.toString(),
      status: status as HotelOrderStatus
    });

    if (!response) {
      throw new BadRequestError("Failed to create order");
    }

    return {
      is_created: true,
      order_id: response._id!,
    };
  }

  async fetchAll(): Promise<FetchAllHotelOrderOutput> {
    const response = await this.hotelOrderRepository.fetchAll();

    return {
      orders: response,
    };
  }

  async fetchOne(args: FetchOneHotelOrderInput): Promise<FetchOneHotelOrderOutput> {
    const { order_id } = args;

    const response = await this.hotelOrderRepository.fetchOneById(order_id);

    if (!response) {
      throw new BadRequestError("Hotel order not found");
    }

    return {
      order: response,
    };
  }

  async update(args: UpdateHotelOrderInput): Promise<UpdateHotelOrderOutput> {
    const { order_id, guest_id, room_id, items, total_amount, status } = args;

    const updateOrder = await this.hotelOrderRepository.update(order_id, {
      guest_id: await this.database.convertStringToObjectId(guest_id!),
      items,
      amount: total_amount?.toString(),
      status: status as HotelOrderStatus,
    });

    if (!updateOrder) {
      throw new BadRequestError("Failed to update hotel order");
    }

    return {
      is_updated: true,
    };
  }

  async delete(args: DeleteHotelOrderInput): Promise<DeleteHotelOrderOutput> {
    const { order_id } = args;

    const response = await this.hotelOrderRepository.delete(order_id);

    if (!response) {
      throw new BadRequestError("Failed to delete hotel order");
    }

    return {
      is_deleted: true,
    };
  }
}
