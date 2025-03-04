import * as http from "http";
import { DefaultErrorMapper } from "./errors/default-error-mapper.js";
import { defaultNotFoundHttpResponse } from "./errors/default-not-found-http-response.js";
import { type ErrorMapper } from "./errors/error-mapper.js";
import { HttpRequestMapper } from "./http/http-request-mapper.js";
import { type HttpResponse } from "./http/http-response.js";
import { RequestHandler } from "./request-handler.js";

export class CleanServer {
  private requestHandlers: RequestHandler<any, any, any>[] = [];

  constructor(
    private readonly httpRequestMapper: HttpRequestMapper = new HttpRequestMapper(),
    private readonly errorMapper: ErrorMapper<any> = new DefaultErrorMapper(),
    private readonly notFoundResponse: HttpResponse<any> = defaultNotFoundHttpResponse
  ) {}

  public addRequestHandler(handler: RequestHandler<any, any, any>) {
    this.requestHandlers.push(handler);
  }

  public start(port: number, callback?: () => void) {
    const server = http.createServer(async (req, res) => {
      const response = await this.processRequest(req);

      res.writeHead(response.status, { "content-type": "application/json" });
      res.write(JSON.stringify(response.body));
      res.end();
    });

    server.listen(port, "localhost", callback);
  }

  private async processRequest(
    req: http.IncomingMessage
  ): Promise<HttpResponse<any>> {
    try {
      const httpRequest = this.httpRequestMapper.map(req);

      for (const handler of this.requestHandlers) {
        const httpResponse = await handler.handleIfMatches(httpRequest);

        if (httpResponse !== null) {
          return httpResponse;
        }
      }

      return this.notFoundResponse;
    } catch (err) {
      return this.errorMapper.mapToHttpResponse(err);
    }
  }
}
