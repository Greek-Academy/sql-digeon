import type { User } from "@/entity/user";

export interface UserRepository {
  create(user: User[]): Promise<void>;
}
