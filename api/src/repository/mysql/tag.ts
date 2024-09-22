import type { Tag } from "@/entity/tag";
import { DatabaseError } from "@/errors/databaseError";
import type { TagRepository } from "@/repository/interface/tag";
import type mysql from "mysql2/promise";

export class TagRepositoryMySQL implements TagRepository {
  constructor(private connection: mysql.Connection) {}

  async create(tags: Tag[]): Promise<void> {
    try {
      const query = `
        INSERT INTO tags (
          id,
          tag_name,
          count,
          excerpt_post_id,
          wiki_post_id
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const tag of tags) {
        const values = [
          tag.id,
          tag.tagName,
          tag.count,
          tag.excerptPostId,
          tag.wikiPostId,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create tag", err);
    }
  }
}
