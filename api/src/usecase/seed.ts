import type { Badge } from "@/entity/badge";
import type { Comment } from "@/entity/comment";
import type { Post } from "@/entity/post";
import type { User } from "@/entity/user";
import type { BadgeRepository } from "@/repository/interface/badge";
import type { CommentRepository } from "@/repository/interface/comment";
import type { PostRepository } from "@/repository/interface/post";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";

export class SeedUseCase {
  constructor(
    private translation: Translation,
    private userRepository: UserRepository,
    private badgeRepository: BadgeRepository,
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
  ) {}

  async execute(
    users: User[],
    badges: Badge[],
    posts: Post[],
    comments: Comment[],
  ): Promise<void> {
    try {
      await this.translation.begin();
      await this.userRepository.create(users);
      await this.badgeRepository.create(badges);
      await this.postRepository.create(posts);
      await this.commentRepository.create(comments);
      await this.translation.commit();
    } catch (error) {
      await this.translation.rollback();
      throw error;
    }
  }
}
