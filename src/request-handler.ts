import { type BodyParser } from "./body/body-parser.js";
import { JsonOnlyBodyParser } from "./body/json-only-body-parser.js";
import { type HttpMethod } from "./http/http-method.js";
import {
  type HttpRequest,
  type NoPathParams,
  type NoRequestBody,
  type ParsedHttpRequest,
} from "./http/http-request.js";
import {
  type HttpResponse,
  type NoResponseBody,
} from "./http/http-response.js";
import { Path } from "./path/path.js";
import { PassthroughSanitizer } from "./sanitizing/passthrough-sanitizer.js";
import { type Sanitizer } from "./sanitizing/sanitizer.js";

export abstract class RequestHandler<
  TRequestPathParams = NoPathParams,
  TRequestBody = NoRequestBody,
  TResponseBody = NoResponseBody
> {
  private readonly method: HttpMethod;
  private readonly path: Path;
  private readonly bodyParser: BodyParser;
  private readonly pathParamsSanitizer: Sanitizer<TRequestPathParams>;
  private readonly bodySanitizer: Sanitizer<TRequestBody>;

  constructor(
    requestHandlerConfig: RequestHandlerConfig<TRequestPathParams, TRequestBody>
  ) {
    this.method = requestHandlerConfig.method;
    this.path = requestHandlerConfig.path;
    this.bodyParser =
      requestHandlerConfig.bodyParser || new JsonOnlyBodyParser();
    this.pathParamsSanitizer =
      requestHandlerConfig.pathParamsSanitizer || new PassthroughSanitizer();
    this.bodySanitizer =
      requestHandlerConfig.bodySanitizer || new PassthroughSanitizer();
  }

  public async handleIfMatches(
    httpReq: HttpRequest
  ): Promise<HttpResponse<TResponseBody> | null> {
    if (httpReq.method !== this.method) {
      return null;
    }

    const pathParams = this.path.extractParameters(httpReq.path);
    if (!pathParams) {
      return null;
    }

    const body = await this.bodyParser.parse(httpReq.body);

    const parsedHttpReq: ParsedHttpRequest<TRequestPathParams, TRequestBody> = {
      pathParams: this.pathParamsSanitizer.sanitize(pathParams),
      body: this.bodySanitizer.sanitize(body),
      headers: httpReq.headers,
    };

    return this.handle(parsedHttpReq);
  }

  protected abstract handle(
    httpReq: ParsedHttpRequest<TRequestPathParams, TRequestBody>
  ): Promise<HttpResponse<TResponseBody>>;
}

export interface RequestHandlerConfig<TPathParams, TRequestBody> {
  method: HttpMethod;
  path: Path;
  bodyParser?: BodyParser;
  pathParamsSanitizer?: Sanitizer<TPathParams>;
  bodySanitizer?: Sanitizer<TRequestBody>;
}
