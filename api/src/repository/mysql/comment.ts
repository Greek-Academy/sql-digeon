import type { Comment } from "@/entity/comment";
import type { CommentRepository } from "@/repository/interface/comment";
import type mysql from "mysql2/promise";

export class CommentRepositoryMySQL implements CommentRepository {
  constructor(private connection: mysql.Connection) {}

  async create(comments: Comment[]): Promise<void> {
    try {
      // データの挿入
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
      console.log(err);
      throw err;
    }
  }
}
