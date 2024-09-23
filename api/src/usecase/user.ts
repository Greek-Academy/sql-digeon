import type { UserCreationMonths } from "@/entity/user";
import type { ILogger } from "@/infra/interface/logger";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";

export class UserUseCase {
  constructor(
    private logger: ILogger,
    private translation: Translation,
    private userRepository: UserRepository,
  ) {}

  async getUserCreationMonths(): Promise<UserCreationMonths[]> {
    return await this.userRepository.creationMonths();
  }
}
