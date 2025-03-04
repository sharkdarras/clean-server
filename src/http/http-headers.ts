import { MimeType } from "./mime-type.js";

export class HttpHeaders {
  constructor(
    private headers: { [key: string]: string | string[] | undefined }
  ) {}

  public static NONE = new HttpHeaders({});

  public get contentType(): MimeType | undefined {
    return this.headers["Content-Type"] as MimeType;
  }

  get(key: string): string | string[] | undefined {
    return this.headers[key];
  }
}
