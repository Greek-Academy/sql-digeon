export interface Translation {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
