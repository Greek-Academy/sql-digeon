import { WrapError } from "@/errors/error";

export class DatabaseError extends WrapError {
  constructor(
    message: string,
    public error: unknown,
  ) {
    super(message, error);
    this.name = "DatabaseError";
  }
}
