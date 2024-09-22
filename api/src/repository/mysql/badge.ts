import { getConfig } from "@/config";
import type { Badge } from "@/entity/badge";
import { DatabaseError } from "@/errors/databaseError";
import type { BadgeRepository } from "@/repository/interface/badge";
import type mysql from "mysql2/promise";

export class BadgeRepositoryMySQL implements BadgeRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(badges: Badge[]): Promise<void> {
    if (badges.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < badges.length; i += this.BATCH_SIZE) {
        const batch = badges.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO badges (
          id,
          user_id,
          name,
          date,
          class,
          tag_based
        )
        VALUES ${batch.map(() => "(?, ?, ?, ?, ?, ?)").join(",")}
      `;

        const values = batch.flatMap((badge) => [
          badge.id,
          badge.userId,
          badge.name,
          badge.date,
          badge.class,
          badge.tagBased,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create badge", err);
    }
  }
}
