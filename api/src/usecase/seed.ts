import type { Badge } from "@/entity/badge";
import type { User } from "@/entity/user";
import type { BadgeRepository } from "@/repository/interface/badge";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";

export class SeedUseCase {
  constructor(
    private translation: Translation,
    private userRepository: UserRepository,
    private badgeRepository: BadgeRepository,
  ) {}

  async execute(users: User[], badges: Badge[]): Promise<void> {
    try {
      await this.translation.begin();
      await this.userRepository.create(users);
      await this.badgeRepository.create(badges);
      await this.translation.commit();
    } catch (error) {
      await this.translation.rollback();
      throw error;
    }
  }
}
