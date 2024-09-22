import { getConfig } from "@/config";
import type { Vote } from "@/entity/vote";
import { DatabaseError } from "@/errors/databaseError";
import type { VoteRepository } from "@/repository/interface/vote";
import type mysql from "mysql2/promise";

export class VoteRepositoryMySQL implements VoteRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(votes: Vote[]): Promise<void> {
    if (votes.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < votes.length; i += this.BATCH_SIZE) {
        const batch = votes.slice(i, i + this.BATCH_SIZE);
        const query = `
        INSERT INTO votes (
          id,
          post_id,
          vote_type_id,
          user_id,
          creation_date,
          bounty_amount
        )
        VALUES ${batch.map(() => "(?,?,?,?,?,?)").join(",")}
      `;

        const values = batch.flatMap((vote) => [
          vote.id,
          vote.postId,
          vote.voteTypeId,
          vote.userId,
          vote.creationDate,
          vote.bountyAmount,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create vote", err);
    }
  }
}
