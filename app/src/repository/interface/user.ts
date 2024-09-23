import type { UserCreationMonths } from "@/entity/user";

export interface UserRepository {
  fetchCreationMonths(): Promise<UserCreationMonths[]>;
}
