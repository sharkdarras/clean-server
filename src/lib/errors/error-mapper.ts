import { HttpResponse } from "../http/http-response";

export interface ErrorMapper<TErrorResponseBody> {
  mapToHttpResponse(error: unknown): HttpResponse<TErrorResponseBody>;
}
