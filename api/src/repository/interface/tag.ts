import type { Tag } from "@/entity/tag";

export interface TagRepository {
  create(tag: Tag[]): Promise<void>;
}
