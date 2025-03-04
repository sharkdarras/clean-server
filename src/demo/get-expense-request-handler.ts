import * as rt from "runtypes";
import { HttpHeaders } from "../lib/http/http-headers";
import { NoRequestBody, ParsedHttpRequest } from "../lib/http/http-request";
import { HttpResponse } from "../lib/http/http-response";
import { Path } from "../lib/path/path";
import { RequestHandler } from "../lib/request-handler";
import { RuntypeSanitizer } from "../lib/sanitizing/runtype-sanitizer";

export class GetExpenseRequestHandler extends RequestHandler<
  GetExpensePathParams,
  NoRequestBody,
  GetExpenseResponseBody
> {
  constructor() {
    super({
      method: "GET",
      path: Path.fromString("/expenses/:id"),
      pathParamsSanitizer: new RuntypeSanitizer(GetExpensePathParams),
    });
  }

  public async handle(
    req: ParsedHttpRequest<GetExpensePathParams, NoRequestBody>
  ): Promise<HttpResponse<GetExpenseResponseBody>> {
    console.log(`Getting expense ${req.pathParams.id}...`);

    return {
      status: 201,
      body: {
        id: req.pathParams.id,
        description: "Lease",
        amount: 30.45,
        date: new Date("2021-01-01").toISOString(),
      },
      headers: HttpHeaders.NONE,
    };
  }
}

const GetExpensePathParams = rt.Object({ id: rt.String.withParser(parseInt) });
type GetExpensePathParams = rt.Parsed<typeof GetExpensePathParams>;

interface GetExpenseResponseBody {
  id: number;
  description: string;
  amount: number;
  date: string;
}
