import type { Vote } from "@/entity/vote";

export interface VoteRepository {
  create(vote: Vote[]): Promise<void>;
}
