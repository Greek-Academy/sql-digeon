import type { Translation } from "@/repository/interface/translation";
import type mysql from "mysql2/promise";

export class TranslationMySQL implements Translation {
  constructor(private connection: mysql.Connection) {}

  async begin(): Promise<void> {
    await this.connection.beginTransaction();
  }
  async commit(): Promise<void> {
    await this.connection.commit();
  }
  async rollback(): Promise<void> {
    await this.connection.rollback();
  }
}
