import { Readable } from "stream";

export interface BodyParser {
  parse(bodyStream: Readable): Promise<unknown>;
}

export class BodyParsingError extends Error {
  constructor(message: string) {
    super(message);
  }
}
