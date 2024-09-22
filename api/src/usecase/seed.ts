import type { Badge } from "@/entity/badge";
import type { Post } from "@/entity/post";
import type { User } from "@/entity/user";
import type { BadgeRepository } from "@/repository/interface/badge";
import type { PostRepository } from "@/repository/interface/post";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";

export class SeedUseCase {
  constructor(
    private translation: Translation,
    private userRepository: UserRepository,
    private badgeRepository: BadgeRepository,
    private postRepository: PostRepository,
  ) {}

  async execute(users: User[], badges: Badge[], posts: Post[]): Promise<void> {
    try {
      await this.translation.begin();
      await this.userRepository.create(users);
      await this.badgeRepository.create(badges);
      await this.postRepository.create(posts);
      await this.translation.commit();
    } catch (error) {
      await this.translation.rollback();
      throw error;
    }
  }
}
