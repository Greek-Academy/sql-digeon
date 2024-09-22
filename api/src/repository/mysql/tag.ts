import { getConfig } from "@/config";
import type { Tag } from "@/entity/tag";
import { DatabaseError } from "@/errors/databaseError";
import type { TagRepository } from "@/repository/interface/tag";
import type mysql from "mysql2/promise";

export class TagRepositoryMySQL implements TagRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(tags: Tag[]): Promise<void> {
    if (tags.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < tags.length; i += this.BATCH_SIZE) {
        const batch = tags.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO tags (
          id,
          tag_name,
          count,
          excerpt_post_id,
          wiki_post_id
        )
        VALUES ${batch.map(() => "(?,?,?,?,?)").join(",")}
      `;

        const values = batch.flatMap((tag) => [
          tag.id,
          tag.tagName,
          tag.count,
          tag.excerptPostId,
          tag.wikiPostId,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create tag", err);
    }
  }
}
