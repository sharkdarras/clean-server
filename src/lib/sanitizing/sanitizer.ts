export interface Sanitizer<TExpected> {
  sanitize(value: unknown): TExpected;
}
