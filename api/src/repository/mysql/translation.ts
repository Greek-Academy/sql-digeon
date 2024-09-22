import { DatabaseError } from "@/errors/databaseError";
import type { Translation } from "@/repository/interface/translation";
import type mysql from "mysql2/promise";

export class TranslationMySQL implements Translation {
  constructor(private connection: mysql.Connection) {}

  async begin(): Promise<void> {
    try {
      await this.connection.beginTransaction();
    } catch (err) {
      throw new DatabaseError("failed to begin transaction", err);
    }
  }
  async commit(): Promise<void> {
    try {
      await this.connection.commit();
    } catch (err) {
      throw new DatabaseError("failed to commit transaction", err);
    }
  }
  async rollback(): Promise<void> {
    try {
      await this.connection.rollback();
    } catch (err) {
      throw new DatabaseError("failed to rollback transaction", err);
    }
  }
}
