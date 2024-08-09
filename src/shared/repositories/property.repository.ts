import { injectable } from "tsyringe";
import { DeleteOutput, IRepository } from "../interfaces";
import { Property } from "../entities";

@injectable()
export default class PropertyRepository implements IRepository<Property> {
  constructor() {}
  create(args: Property): Promise<Property> {
    throw new Error("Method not implemented.");
  }
  fetchAll(): Promise<Property[]> {
    throw new Error("Method not implemented.");
  }
  fetchOneById(id: string): Promise<Property | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, update: Partial<Property>): Promise<Property | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<DeleteOutput> {
    throw new Error("Method not implemented.");
  }
}
