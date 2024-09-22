import type { Comment } from "@/entity/comment";

export interface CommentRepository {
  create(comment: Comment[]): Promise<void>;
}
