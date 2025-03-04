import { Readable } from "stream";
import { HttpHeaders } from "./http-headers.js";
import { type HttpMethod } from "./http-method.js";

export interface HttpRequest {
  method: HttpMethod;
  path: string;
  headers: HttpHeaders;
  body: Readable;
}

export interface ParsedHttpRequest<TPathParams, TBody> {
  pathParams: TPathParams;
  body: TBody;
  headers: HttpHeaders;
}

export type PathParams = { [key: string]: string };
export type QueryParams = { [key: string]: string };

export type NoPathParams = undefined;
export type NoRequestBody = undefined;
