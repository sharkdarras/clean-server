import { HttpHeaders } from "../http/http-headers.js";
import { type HttpResponse } from "../http/http-response.js";

export const defaultNotFoundHttpResponse: HttpResponse<any> = {
  status: 404,
  body: {
    name: "NotFound",
    message: "The requested resource was not found.",
  },
  headers: HttpHeaders.NONE,
};
