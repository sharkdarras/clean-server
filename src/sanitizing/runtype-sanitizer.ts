import { type Sanitizer } from "./sanitizer.js";

export class RuntypeSanitizer<TParsed> implements Sanitizer<TParsed> {
  constructor(private runtype: RuntypeChecker<TParsed>) {}

  sanitize(value: unknown): TParsed {
    return this.runtype.parse(value);
  }
}

interface RuntypeChecker<TParsed> {
  parse(value: unknown): TParsed;
}
