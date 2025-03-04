import { HttpHeaders } from "./http-headers.js";

export interface HttpResponse<TBody> {
  status: number;
  body: TBody;
  headers: HttpHeaders;
}

export type NoResponseBody = undefined;
