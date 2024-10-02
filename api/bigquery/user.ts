import { getConfig } from "@/config";
import { User, UserCreationMonths } from "@/entity/user";
import { DatabaseError } from "@/errors/databaseError";
import { UserRepository } from "@/repository/interface/user";
import type mysql from "mysql2/promise";

export class UserRepositoryBigquery implements UserRepository {
  private BATCH_SIZE = getConfig("database").batchSize;

  constructor(private connection: mysql.Connection, private bigquery:any) {}

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
        FORMAT_DATE('%Y-%m-01', creation_date) AS month,
        COUNT(*) as count
      FROM
        bigquery-public-data.stackoverflow.users
      GROUP BY
        month
      ORDER BY
        month
    `;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    // location: 'US',
  };

  // Run the query as a job
  const [job] = await this.bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  return rows as UserCreationMonths[];
  }
}
