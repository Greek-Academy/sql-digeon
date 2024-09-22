import { getConfig } from "@/config";
import type { Comment } from "@/entity/comment";
import { DatabaseError } from "@/errors/databaseError";
import type { CommentRepository } from "@/repository/interface/comment";
import type mysql from "mysql2/promise";

export class CommentRepositoryMySQL implements CommentRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(comments: Comment[]): Promise<void> {
    if (comments.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < comments.length; i += this.BATCH_SIZE) {
        const batch = comments.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO comments (
          id,
          post_id,
          score,
          text,
          creation_date,
          user_id,
          user_display_name
        )
        VALUES ${batch.map(() => "(?, ?, ?, ?, ?, ?, ?)").join(",")}
      `;

        const values = batch.flatMap((comment) => [
          comment.id,
          comment.postId,
          comment.score,
          comment.text,
          comment.creationDate,
          comment.userId,
          comment.userDisplayName,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create comment", err);
    }
  }
}
