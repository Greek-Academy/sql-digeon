import type { User, UserCreationMonths } from "@/entity/user";

export interface UserRepository {
  create(user: User[]): Promise<void>;
  creationMonths(): Promise<UserCreationMonths[]>;
}
