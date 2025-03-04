import { HttpHeaders } from "../http/http-headers";
import { HttpResponse } from "../http/http-response";

export const defaultNotFoundHttpResponse: HttpResponse<any> = {
  status: 404,
  body: {
    name: "NotFound",
    message: "The requested resource was not found.",
  },
  headers: HttpHeaders.NONE,
};
