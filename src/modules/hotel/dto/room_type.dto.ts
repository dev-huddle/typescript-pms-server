import { HotelRoomType } from "../../../shared/entities";

export type CreateTypeInput = {
  title: string;
  description: string;
  amount: string;
  discount_amount?: string;
  hotel_id: string;
};

export type CreateTypeOutput = {
  is_created: boolean;
};

export type FetchAllHotelRoomTypeInput = {};

export type FetchAllHotelRoomTypeOutput = {
  room_types: HotelRoomType[];
};

export type FetchOneHotelRoomTypeInput = {
  room_type_id: string;
};

export type FetchOneHotelRoomTypeOutput = {
  room_type: HotelRoomType;
};

export type UpdateHotelRoomTypeInput = {
  title?: string;
  description?: string;
  amount?: string;
  discount_amount?: string;
  hotel_id: string;
};

export type UpdateHotelRoomTypeOutput = {
  is_updated: boolean;
};

export type DeleteHotelRoomTypeInput = {
  hotel_room_id: string;
};

export type DeleteHotelRoomTypeOutput = {
  is_deleted: boolean;
};
