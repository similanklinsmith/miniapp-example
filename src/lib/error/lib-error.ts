import { ZodError } from "zod";

export class LibError extends Error {
  public readonly code: string;
  public readonly cause: Error | undefined;
  constructor(message: string, code: string, cause?: any) {
    if (cause instanceof ZodError) {
      super(
        cause.errors
          .map((error) => `[Key:${error.path}, Message:${error.message}]`)
          .join(" ")
      );
      this.code = code;
      this.cause = cause;
      return;
    }

    super(message);
    this.code = code;
    this.cause = cause;
  }
}
