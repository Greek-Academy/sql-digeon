import type { PostLink } from "@/entity/postLink";
import { DatabaseError } from "@/errors/databaseError";
import type { PostLinkRepository } from "@/repository/interface/postLink";
import type mysql from "mysql2/promise";

export class PostLinkRepositoryMySQL implements PostLinkRepository {
  constructor(private connection: mysql.Connection) {}

  async create(postLinks: PostLink[]): Promise<void> {
    try {
      // データの挿入
      const query = `
        INSERT INTO post_links (
          id,
          creation_date,
          post_id,
          related_post_id,
          link_type_id
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const postLink of postLinks) {
        const values = [
          postLink.id,
          postLink.creationDate,
          postLink.postId,
          postLink.relatedPostId,
          postLink.linkTypeId,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create postLink", err);
    }
  }
}
