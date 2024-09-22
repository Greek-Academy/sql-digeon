import type { Badge } from "@/entity/badge";

export interface BadgeRepository {
  create(badge: Badge[]): Promise<void>;
}
