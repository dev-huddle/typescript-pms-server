import FileManager from "./filemanager.entity";
import HotelAmenity, { HotelAmenityMedia } from "./hotel_amenities.entity";
import { HotelAmenityMenu, HotelAmenityMenuMedia } from "./hotel_amenities_menu.entity";
import HotelBooking from "./hotel_booking.entity";
import { HotelOrder } from "./hotel_orders.entity";
import HotelRoom from "./hotel_room_inventory.entity";
import HotelRoomType from "./hotel_room_type.entity";
import Plan from "./plan.entity";
import Property, { PropertyAddress, PropertyMedia } from "./property.entity";
import Subscription from "./subscription.entity";
import User from "./user.entity";

export {
  User,
  Plan,
  Subscription,
  FileManager,
  Property,
  PropertyAddress,
  PropertyMedia,
  HotelRoom,
  HotelRoomType,
  HotelBooking,
  HotelAmenity,
  HotelAmenityMedia,
  HotelAmenityMenu,
  HotelAmenityMenuMedia,
  HotelOrder
};
