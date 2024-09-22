import { WrapError } from "@/errors/error";
import type { ILogger } from "@/infra/interface/logger";
import winston from "winston";

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string | unknown): void {
    if (message instanceof WrapError) {
      this.logger.error(message.message, {
        error: message.error,
        stack: message.stack,
      });
    } else if (message instanceof Error) {
      this.logger.error(message.message, {
        stack: message.stack,
      });
    } else {
      this.logger.error(message);
    }
  }
}
