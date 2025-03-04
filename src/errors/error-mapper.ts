import { type HttpResponse } from "../http/http-response.js";

export interface ErrorMapper<TErrorResponseBody> {
  mapToHttpResponse(error: unknown): HttpResponse<TErrorResponseBody>;
}
