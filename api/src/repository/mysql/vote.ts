import type { Vote } from "@/entity/vote";
import { DatabaseError } from "@/errors/databaseError";
import type { VoteRepository } from "@/repository/interface/vote";
import type mysql from "mysql2/promise";

export class VoteRepositoryMySQL implements VoteRepository {
  constructor(private connection: mysql.Connection) {}

  async create(votes: Vote[]): Promise<void> {
    try {
      // データの挿入
      const query = `
        INSERT INTO votes (
          id,
          post_id,
          vote_type_id,
          user_id,
          creation_date,
          bounty_amount
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const vote of votes) {
        const values = [
          vote.id,
          vote.postId,
          vote.voteTypeId,
          vote.userId,
          vote.creationDate,
          vote.bountyAmount,
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create vote", err);
    }
  }
}
