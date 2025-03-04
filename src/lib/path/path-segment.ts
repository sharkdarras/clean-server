export interface PathSegment {
  matches(segment: string): boolean;
  getParamKey(): string | null;
}

export class StaticPathSegment implements PathSegment {
  constructor(private value: string) {}

  public matches(segment: string): boolean {
    return this.value === segment;
  }

  public getParamKey(): null {
    return null;
  }
}

export class ParameterPathSegment implements PathSegment {
  constructor(private key: string) {}

  public matches(): boolean {
    return true;
  }

  public getParamKey(): string {
    return this.key;
  }
}
