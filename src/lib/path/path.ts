import { PathParams } from "../http/http-request";
import {
  ParameterPathSegment,
  PathSegment,
  StaticPathSegment,
} from "./path-segment";

export class Path {
  private segments: PathSegment[];

  constructor(segments: PathSegment[]) {
    this.segments = segments;
  }

  public static fromString(templatePath: string): Path {
    const segments = this.extractSegmentValues(templatePath).map((segment) => {
      if (segment.startsWith(":")) {
        return new ParameterPathSegment(segment.slice(1));
      } else {
        return new StaticPathSegment(segment);
      }
    });

    return new Path(segments);
  }

  public extractParameters(requestedPath: string): PathParams | null {
    const segmentValues = Path.extractSegmentValues(requestedPath);

    if (this.segments.length !== segmentValues.length) {
      return null;
    }

    const pairs: [PathSegment, string][] = this.segments.map(
      (segment, i) => [segment, segmentValues[i]] as [PathSegment, string]
    );

    const params: PathParams = {};

    for (const [segment, value] of pairs) {
      if (!segment.matches(value)) return null;

      const key = segment.getParamKey();
      if (key) {
        params[key] = value;
      }
    }

    return params;
  }

  private static extractSegmentValues(path: string): string[] {
    return path
      .trim()
      .split("/")
      .filter((segment) => segment.length > 0);
  }
}
