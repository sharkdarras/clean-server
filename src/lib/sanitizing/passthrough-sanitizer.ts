import { Sanitizer } from "./sanitizer";

export class PassthroughSanitizer implements Sanitizer<any> {
  sanitize(value: unknown): any {
    return value;
  }
}
