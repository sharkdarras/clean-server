import { IncomingMessage } from "http";
import { type BodyParser, BodyParsingError } from "./body-parser.js";

export class JsonOnlyBodyParser implements BodyParser {
  public parse(req: IncomingMessage): Promise<unknown> {
    if (!req.headers["content-type"]?.includes("application/json")) {
      throw new BodyParsingError("Only JSON bodies are supported.");
    }

    return new Promise((resolve, rejects) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          rejects(new BodyParsingError("Invalid JSON body."));
        }
      });
    });
  }
}
