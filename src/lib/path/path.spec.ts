import { Path } from "./path";

describe("Path", () => {
  test("given requested path matching path, when extracting parameters, then returns empty object", () => {
    const path = Path.fromString("path/to/someplace");

    const result = path.extractParameters("path/to/someplace");

    expect(result).toEqual({});
  });

  test("given requested path different than path, when extracting parameters, then returns null", () => {
    const path = Path.fromString("path/to/someplace");

    const result = path.extractParameters("path/to/somewehere/else");

    expect(result).toEqual(null);
  });

  test("given requested path with leading slash matching path, when extracting parameters, then returns empty object", () => {
    const path = Path.fromString("path/boat");

    const result = path.extractParameters("/path/boat");

    expect(result).toEqual({});
  });

  test("given requested path with tailing slash matching path, when extracting parameters, then returns empty object", () => {
    const path1 = Path.fromString("path");

    const result = path1.extractParameters("path/");

    expect(result).toEqual({});
  });

  test("given path has one parameter, when extracting parameters, then returns extracted parameter", () => {
    const path1 = Path.fromString("path/:id/action");

    const result = path1.extractParameters("path/456/action");

    expect(result).toHaveProperty("id", "456");
  });
});
