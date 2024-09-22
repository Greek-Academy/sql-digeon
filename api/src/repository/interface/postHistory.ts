import type { PostHistory } from "@/entity/postHistory";

export interface PostHistoryRepository {
  create(postHistories: PostHistory[]): Promise<void>;
}
