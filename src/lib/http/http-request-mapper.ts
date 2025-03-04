import { IncomingMessage } from "http";
import { HttpHeaders } from "./http-headers";
import { HttpMethod } from "./http-method";
import { HttpRequest } from "./http-request";

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
