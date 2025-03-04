import { type Sanitizer } from "./sanitizer.js";

export class PassthroughSanitizer implements Sanitizer<any> {
  sanitize(value: unknown): any {
    return value;
  }
}
