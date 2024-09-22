export class WrapError extends Error {
  constructor(
    message: string,
    public error: unknown,
  ) {
    super(message);
  }
}
