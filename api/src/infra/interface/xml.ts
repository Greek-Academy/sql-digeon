import type { Badge } from "@/entity/badge";
import type { Comment } from "@/entity/comment";
import type { Post } from "@/entity/post";
import type { PostHistory } from "@/entity/postHistory";
import type { PostLink } from "@/entity/postLink";
import type { Tag } from "@/entity/tag";
import type { User } from "@/entity/user";
import type { Vote } from "@/entity/vote";

export interface IXml {
  users: () => Promise<User[]>;
  badges: () => Promise<Badge[]>;
  posts: () => Promise<Post[]>;
  comments: () => Promise<Comment[]>;
  postHistories: () => Promise<PostHistory[]>;
  postLinks: () => Promise<PostLink[]>;
  tags: () => Promise<Tag[]>;
  votes: () => Promise<Vote[]>;
}
