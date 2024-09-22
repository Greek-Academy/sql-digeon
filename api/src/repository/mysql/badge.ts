import type { Badge } from "@/entity/badge";
import { DatabaseError } from "@/errors/databaseError";
import type { BadgeRepository } from "@/repository/interface/badge";
import type mysql from "mysql2/promise";

export class BadgeRepositoryMySQL implements BadgeRepository {
  constructor(private connection: mysql.Connection) {}

  async create(badges: Badge[]): Promise<void> {
    try {
      // データの挿入
      const query = `
        INSERT INTO badges (
          id,
          user_id,
          name,
          date,
          class,
          tag_based
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const badge of badges) {
        const values = [
          badge.id,
          badge.userId,
          badge.name,
          badge.date,
          badge.class,
          badge.tagBased,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create badge", err);
    }
  }
}
