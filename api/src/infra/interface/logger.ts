export interface ILogger {
  info(message: string): void;
  error(message: string, trace: string): void;
}
