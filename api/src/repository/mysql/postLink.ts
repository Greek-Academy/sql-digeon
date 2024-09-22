import { getConfig } from "@/config";
import type { PostLink } from "@/entity/postLink";
import { DatabaseError } from "@/errors/databaseError";
import type { PostLinkRepository } from "@/repository/interface/postLink";
import type mysql from "mysql2/promise";

export class PostLinkRepositoryMySQL implements PostLinkRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(postLinks: PostLink[]): Promise<void> {
    if (postLinks.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < postLinks.length; i += this.BATCH_SIZE) {
        const batch = postLinks.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO post_links (
          id,
          creation_date,
          post_id,
          related_post_id,
          link_type_id
        )
        VALUES ${batch.map(() => "(?,?,?,?,?)").join(",")}
      `;

        const values = batch.flatMap((postLink) => [
          postLink.id,
          postLink.creationDate,
          postLink.postId,
          postLink.relatedPostId,
          postLink.linkTypeId,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create postLink", err);
    }
  }
}
