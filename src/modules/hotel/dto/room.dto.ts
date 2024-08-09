import { HotelRoomStatus } from "../../../shared/constants";
import { HotelRoom, HotelRoomType } from "../../../shared/entities";

export type CreateHotelRoomInput = {
  hotel_id: string;
  number: string;
  room_type_id: string;
  status: HotelRoomStatus;
  files?: any;
};

export type CreateHotelRoomOutput = {
  is_created: boolean;
};

export type FetchAllHotelRoomInput = {};

export type FetchAllHotelRoomOutput = {
  rooms: HotelRoom[];
};

export type FetchOneHotelRoomInput = {
  room_id: string;
};

export type FetchOneHotelRoomOutput = {
  room: HotelRoom;
};

export type UpdateHotelRoomInput = {
  hotel_id: string;
  number?: string;
  room_type_id?: string;
  status?: HotelRoomStatus;
  files?: any;
};

export type UpdateHotelRoomOutput = {
  is_updated: boolean;
};

export type DeleteHotelRoomInput = {
  room_id: string;
};

export type DeleteHotelRoomOutput = {
  is_deleted: boolean;
};
