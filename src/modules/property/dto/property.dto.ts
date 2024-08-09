import { PropertyTypes } from "../../../shared/constants";
import { Property, PropertyAddress } from "../../../shared/entities";

export type CreatePropertyInput = {
  name: string;
  creator_id: string;
  type: PropertyTypes;
  address: PropertyAddress;
  files?: any;
};

export type CreatePropertyOutput = {
  is_created: boolean;
};

export type FetchAllPropertyInput = {

}

export type FetchAllPropertyOutput = {
    properties: Property[]
}

export type FetchOnePropertyInput = {
    property_id: string;
}

export type FetchOnePropertyOutput = {
    property: Property
}

export type DeletePropertyInput = {
    property_id: string
}

export type DeletePropertyOutput = {
    is_deleted: boolean;
}
