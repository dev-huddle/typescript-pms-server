import { PropertyTypes } from "../../../shared/constants";
import { PropertyAddress } from "../../../shared/entities";

export type CreatePropertyInput = {
  name: string;
  creator_id: string;
  type: PropertyTypes;
  address: PropertyAddress;
};

export type CreatePropertyOutput = {
  is_created: boolean;
};
