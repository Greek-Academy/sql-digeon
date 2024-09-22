import { getConfig } from "@/config";
import type { PostHistory } from "@/entity/postHistory";
import { DatabaseError } from "@/errors/databaseError";
import type { PostHistoryRepository } from "@/repository/interface/postHistory";
import type mysql from "mysql2/promise";

export class PostHistoryRepositoryMySQL implements PostHistoryRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(postHistories: PostHistory[]): Promise<void> {
    if (postHistories.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < postHistories.length; i += this.BATCH_SIZE) {
        const batch = postHistories.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO post_histories (
          id,
          post_history_type_id,
          post_id,
          revision_guid,
          creation_date,
          user_id,
          user_display_name,
          comment,
          text,
          content_license
        )
        VALUES ${batch.map(() => "(?,?,?,?,?,?,?,?,?,?)").join(",")}
      `;

        const values = batch.flatMap((postHistory) => [
          postHistory.id,
          postHistory.postHistoryTypeId,
          postHistory.postId,
          postHistory.revisionGuid,
          postHistory.creationDate,
          postHistory.userId,
          postHistory.userDisplayName,
          postHistory.comment,
          postHistory.text,
          postHistory.contentLicense,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create postHistory", err);
    }
  }
}
