export function hasShapeOf<T>(body: unknown): body is WithPropertiesOf<T> {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  return true;
}

type WithPropertiesOf<T> = {
  [K in keyof T]: unknown;
};
