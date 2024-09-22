import type { Comment } from "@/entity/comment";
import { DatabaseError } from "@/errors/databaseError";
import type { CommentRepository } from "@/repository/interface/comment";
import type mysql from "mysql2/promise";

export class CommentRepositoryMySQL implements CommentRepository {
  constructor(private connection: mysql.Connection) {}

  async create(comments: Comment[]): Promise<void> {
    try {
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
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const comment of comments) {
        const values = [
          comment.id,
          comment.postId,
          comment.score,
          comment.text,
          comment.creationDate,
          comment.userId,
          comment.userDisplayName,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create comment", err);
    }
  }
}
