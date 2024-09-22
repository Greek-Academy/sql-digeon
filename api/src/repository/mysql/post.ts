import type { Post } from "@/entity/post";
import { DatabaseError } from "@/errors/databaseError";
import type { PostRepository } from "@/repository/interface/post";
import type mysql from "mysql2/promise";

export class PostRepositoryMySQL implements PostRepository {
  constructor(private connection: mysql.Connection) {}

  async create(posts: Post[]): Promise<void> {
    try {
      const query = `
        INSERT INTO posts (
          id,
          post_type_id,
          accepted_answer_id,
          creation_date,
          score,
          body,
          owner_user_id,
          owner_display_name,
          last_editor_user_id,
          last_editor_display_name,
          last_edit_date,
          last_activity_date,
          title,
          tags,
          answer_count,
          comment_count,
          community_owned_date,
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

      for (const post of posts) {
        const values = [
          post.id,
          post.postTypeId,
          post.acceptedAnswerId,
          post.creationDate,
          post.score,
          post.body,
          post.ownerUserId,
          post.ownerDisplayName,
          post.lastEditorUserId,
          post.lastEditorDisplayName,
          post.lastEditDate,
          post.lastActivityDate,
          post.title,
          post.tags,
          post.answerCount,
          post.commentCount,
          post.communityOwnedDate,
          post.contentLicense,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create post", err);
    }
  }
}
