import type { PostLink } from "@/entity/postLink";

export interface PostLinkRepository {
  create(postLink: PostLink[]): Promise<void>;
}
