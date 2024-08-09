import { injectable } from "tsyringe";
import { CreatePropertyInput, CreatePropertyOutput } from "../dto";
import { PropertyRepository, UserRepository } from "../../../shared/repositories";
import { Database } from "../../../shared/facade";
import { BadRequestError } from "../../../shared/errors";

@injectable()
export default class PropertyService {
  constructor(
    private propertyRepository: PropertyRepository,
    private userRepository: UserRepository,
    private database: Database,
  ) {}

  async create(args: CreatePropertyInput): Promise<CreatePropertyOutput> {
    const { creator_id, type, address, name } = args;

    const user = await this.userRepository.fetchOneByCognitoId(creator_id);

    const response = await this.propertyRepository.create({
      name,
      type,
      address,
      creator_id: await this.database.convertStringToObjectId(user?._id!),
    });

    if (!response) {
      throw new BadRequestError("property has been created");
    }

    return {
      is_created: true,
    };
  }
}
