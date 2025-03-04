import * as rt from "runtypes";
import { RuntypeSanitizer } from "./runtype-sanitizer";

describe("RuntypeSanitizer", () => {
  const ExampleValue = rt.Object({
    name: rt.String,
    amount: rt.Number,
  });

  const runtypeBodySanitizer = new RuntypeSanitizer(ExampleValue);

  test("given value matching runtype, when sanitizing, then returns body", () => {
    const validInput = { name: "Test", amount: 42 };

    const result = runtypeBodySanitizer.sanitize(validInput);

    expect(result).toEqual(validInput);
  });

  test("given value with missing attribute, when sanitizing, then throws error", () => {
    const invalidInput = { name: "Test" };

    expect(() => runtypeBodySanitizer.sanitize(invalidInput)).toThrow(
      rt.ValidationError
    );
  });
});
