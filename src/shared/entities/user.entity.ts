import mongoose from "mongoose";
import { Base } from "./base.entity";
import { UserAccountStatus, UserAccountTypes } from "../constants";

export default interface User extends Base {
  awscognito_user_id?: string;
  stripe_customer_id?: string;
  stripe_card_id?: string; // filled only when user has a card
  stripe_card_last_digits?: string;
  stripe_card_expire_date?: string;
  stripe_card_type?: string;
  active_plan?: mongoose.Types.ObjectId; // filled only when user has an active plan
  status?: UserAccountStatus;
  account_type?: UserAccountTypes;
  isFirstLogin?: boolean;
}
