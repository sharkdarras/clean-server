import { IncomingMessage } from "http";
import { HttpHeaders } from "./http-headers.js";
import { type HttpMethod } from "./http-method.js";
import { type HttpRequest } from "./http-request.js";

export class HttpRequestMapper {
  map(req: IncomingMessage): HttpRequest {
    return {
      method: req.method as HttpMethod,
      path: req.url || "/",
      body: req,
      headers: new HttpHeaders(req.headers),
    };
  }
}
