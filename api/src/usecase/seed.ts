import type { User } from "@/entity/user";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";

export class SeedUseCase {
  constructor(
    private translation: Translation,
    private userRepository: UserRepository,
  ) {}

  async execute(users: User[]): Promise<void> {
    try {
      await this.translation.begin();
      await this.userRepository.create(users);
      await this.translation.commit();
    } catch (error) {
      await this.translation.rollback();
      throw error;
    }
  }
}
