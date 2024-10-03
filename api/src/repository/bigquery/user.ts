import type { User, UserCreationMonths } from "@/entity/user";
import { DatabaseError } from "@/errors/databaseError";
import type { UserRepository } from "@/repository/interface/user";
import type { BigQuery } from "@google-cloud/bigquery";

export class UserRepositoryBigquery implements UserRepository {
  constructor(private bigquery: BigQuery) {}

  async create(users: User[]): Promise<void> {
    throw new DatabaseError("BigQuery does not support write operations", null);
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
