import { WrapError } from "@/errors/error";

export class XmlError extends WrapError {
  constructor(
    message: string,
    public error: unknown,
  ) {
    super(message, error);
    this.name = "XmlError";
  }
}
