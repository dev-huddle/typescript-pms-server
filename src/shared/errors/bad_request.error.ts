import { container } from "tsyringe";
import { CustomError } from "./custom.error";
import LoggerService from "../services/logger.service";
import { StatusCodes } from "../constants";

export default class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  metadata;
  constructor(message: string, metadata?: {}) {
    super(message);
    this.metadata = metadata;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    const logger = container.resolve(LoggerService);
    logger.log(`${this.message}`);
    return [{ message: this.message }];
  }
}