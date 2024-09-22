import type { Post } from "@/entity/post";

export interface PostRepository {
  create(post: Post[]): Promise<void>;
}
