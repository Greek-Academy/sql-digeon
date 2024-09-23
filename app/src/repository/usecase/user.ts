import type { UserCreationMonths } from "@/entity/user";
import type { UserRepository } from "@/repository/interface/user";

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async fetchCreationMonths(): Promise<UserCreationMonths[]> {
    return this.userRepository.fetchCreationMonths();
  }
}
