import { getConfig } from "@/config";
import type { Post } from "@/entity/post";
import { DatabaseError } from "@/errors/databaseError";
import type { PostRepository } from "@/repository/interface/post";
import type mysql from "mysql2/promise";

export class PostRepositoryMySQL implements PostRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(posts: Post[]): Promise<void> {
    if (posts.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < posts.length; i += this.BATCH_SIZE) {
        const batch = posts.slice(i, i + this.BATCH_SIZE);

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
          VALUES ${batch.map(() => "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").join(",")}
        `;

        const values = batch.flatMap((post) => [
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
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create posts", err);
    }
  }
}
