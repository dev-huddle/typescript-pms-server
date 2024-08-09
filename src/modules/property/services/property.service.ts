import { injectable } from "tsyringe";
import { CreatePropertyInput, CreatePropertyOutput } from "../dto";
import { PropertyRepository, UserRepository } from "../../../shared/repositories";
import { Database } from "../../../shared/facade";
import { BadRequestError } from "../../../shared/errors";
import { PropertyMedia } from "../../../shared/entities";
import { PropertyFileTypes } from "../../../shared/constants";

@injectable()
export default class PropertyService {
  constructor(
    private propertyRepository: PropertyRepository,
    private userRepository: UserRepository,
    private database: Database,
  ) {}

  async create(args: CreatePropertyInput): Promise<CreatePropertyOutput> {
    const { creator_id, type, address, name, files } = args;

    const user = await this.userRepository.fetchOneByCognitoId(creator_id);

    let thumbnail: PropertyMedia[] = [];

    // organize files to be saved
    if(files?.length) {
        ( files as unknown as Array<{ [fieldname: string]: File[]; } | File[] | undefined > ).map(async (file: any)=>{
            thumbnail.push({
                title: file ? file.fieldname : "",
                key: file ? file.key : "",
                file_type: PropertyFileTypes.PICTURE
            })
        });
    }

    const response = await this.propertyRepository.create({
      name,
      type,
      address,
      creator_id: await this.database.convertStringToObjectId(user?._id!),
      media: thumbnail ? thumbnail : []
    });

    if (!response) {
      throw new BadRequestError("property has been created");
    }

    return {
      is_created: true,
    };
  }
}
