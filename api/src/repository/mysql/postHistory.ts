import type { PostHistory } from "@/entity/postHistory";
import { DatabaseError } from "@/errors/databaseError";
import type { PostHistoryRepository } from "@/repository/interface/postHistory";
import type mysql from "mysql2/promise";

export class PostHistoryRepositoryMySQL implements PostHistoryRepository {
  constructor(private connection: mysql.Connection) {}

  async create(postHistories: PostHistory[]): Promise<void> {
    try {
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
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const postHistory of postHistories) {
        const values = [
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
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create postHistory", err);
    }
  }
}
