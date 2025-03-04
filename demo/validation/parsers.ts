export function parseString(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error(`Expected a string, but got ${typeof value}.`);
  }
  return value;
}

export function parseNumber(value: unknown): number {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`Cannot parse "${value}" as a number.`);
    }
    return num;
  }
  throw new Error(`Expected a number, but got ${typeof value}.`);
}

export function parseDate(value: unknown): Date {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Cannot parse "${value}" as a valid Date.`);
    }
    return date;
  }
  throw new Error(`Expected a Date-compatible value, but got ${typeof value}.`);
}
