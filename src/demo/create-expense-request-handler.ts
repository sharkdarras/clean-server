import * as rt from "runtypes";
import { HttpHeaders } from "../lib/http/http-headers";
import { NoPathParams, ParsedHttpRequest } from "../lib/http/http-request";
import { HttpResponse } from "../lib/http/http-response";
import { Path } from "../lib/path/path";
import { RequestHandler } from "../lib/request-handler";
import { RuntypeSanitizer } from "../lib/sanitizing/runtype-sanitizer";

export class CreateExpenseRequestHandler extends RequestHandler<
  NoPathParams,
  CreateExpenseRequestBody,
  CreateExpenseResponseBody
> {
  constructor() {
    super({
      method: "POST",
      path: Path.fromString("/expenses"),
      bodySanitizer: new RuntypeSanitizer(CreateExpenseRequestBody),
    });
  }

  public async handle(
    req: ParsedHttpRequest<NoPathParams, CreateExpenseRequestBody>
  ): Promise<HttpResponse<CreateExpenseResponseBody>> {
    console.log("Creating expense...");

    return {
      status: 201,
      body: {
        id: 1234,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date.toISOString(),
      },
      headers: HttpHeaders.NONE,
    };
  }
}

const CreateExpenseRequestBody = rt.Object({
  description: rt.String,
  amount: rt.Number,
  date: rt.String.withParser((dateStr) => new Date(dateStr)),
});
type CreateExpenseRequestBody = rt.Parsed<typeof CreateExpenseRequestBody>;

interface CreateExpenseResponseBody {
  id: number;
  description: string;
  amount: number;
  date: string;
}
