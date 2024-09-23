import { getConfig } from "@/config";
import type { User, UserCreationMonths } from "@/entity/user";
import { DatabaseError } from "@/errors/databaseError";
import type { UserRepository } from "@/repository/interface/user";
import type mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2/promise";

export class UserRepositoryMySQL implements UserRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection) {}

  async create(users: User[]): Promise<void> {
    if (users.length === 0) {
      return;
    }

    try {
      for (let i = 0; i < users.length; i += this.BATCH_SIZE) {
        const batch = users.slice(i, i + this.BATCH_SIZE);

        const query = `
        INSERT INTO users (
          id,
          reputation,
          creation_date,
          display_name,
          last_access_date,
          website_url,
          location,
          about_me,
          views,
          up_votes,
          down_votes,
          account_id
        )
        VALUES ${batch.map(() => "(?,?,?,?,?,?,?,?,?,?,?,?)").join(",")}
      `;

        const values = batch.flatMap((user) => [
          user.id,
          user.reputation,
          user.creationDate,
          user.displayName,
          user.lastAccessDate,
          user.websiteUrl,
          user.location,
          user.aboutMe,
          user.views,
          user.upVotes,
          user.downVotes,
          user.accountId,
        ]);

        await this.connection.query(query, values);
      }
    } catch (err) {
      throw new DatabaseError("failed to create user", err);
    }
  }

  async creationMonths(): Promise<UserCreationMonths[]> {
    const query = `
      SELECT
        DATE_FORMAT(creation_date, '%Y-%m-01') AS month,
        COUNT(*) as count
      FROM
        users
      GROUP BY
        month
      ORDER BY
        month
    `;
    const [rows] = await this.connection.query<RowDataPacket[]>(query);
    return rows as UserCreationMonths[];
  }
}
