import mysql from "mysql2/promise";
import { User } from "@/entity/user";
import { UserRepository } from "@/repository/interface/user";

export class UserRepositoryMySQL implements UserRepository {
  constructor(private connection: mysql.Connection) {}

  async create(users: User[]): Promise<void> {
    try {
      // データの挿入
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
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const user of users) {
        const values = [
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
        ];

        await this.connection.query(query, values);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
