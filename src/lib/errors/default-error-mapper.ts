import { HttpHeaders } from "../http/http-headers";
import { HttpResponse } from "../http/http-response";
import { ErrorMapper } from "./error-mapper";

export class DefaultErrorMapper
  implements ErrorMapper<DefaultErrorResponseBody>
{
  public mapToHttpResponse(
    error: unknown
  ): HttpResponse<DefaultErrorResponseBody> {
    console.error(error);

    let name: string, message: string;
    if (error instanceof Error) {
      name = error.name;
      message = error.message;
    } else {
      name = "UnknownError";
      message = "An unknown error occurred.";
    }

    return {
      status: 500,
      body: {
        name: name,
        message: message,
      },
      headers: HttpHeaders.NONE,
    };
  }
}

interface DefaultErrorResponseBody {
  name: string;
  message: string;
}
