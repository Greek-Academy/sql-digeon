/**
 * シードデータを挿入するスクリプト
 * XML_PATHにあるXMLをDBに挿入する
 */
import { WinstonLogger } from "@/infra/logger/winston";
import { Xml2js } from "@/infra/xml/xml2js/core";
import { BadgeRepositoryMySQL } from "@/repository/mysql/badge";
import { CommentRepositoryMySQL } from "@/repository/mysql/comment";
import { MySQLSingleton } from "@/repository/mysql/core";
import { PostRepositoryMySQL } from "@/repository/mysql/post";
import { PostHistoryRepositoryMySQL } from "@/repository/mysql/postHistory";
import { PostLinkRepositoryMySQL } from "@/repository/mysql/postLink";
import { TagRepositoryMySQL } from "@/repository/mysql/tag";
import { TranslationMySQL } from "@/repository/mysql/translation";
import { UserRepositoryMySQL } from "@/repository/mysql/user";
import { VoteRepositoryMySQL } from "@/repository/mysql/vote";
import { SeedUseCase } from "@/usecase/seed";

(async () => {
  const logger = new WinstonLogger();
  logger.info("start seed");
  try {
    // 依存性の注入
    const xml = new Xml2js();

    const db = await MySQLSingleton.getInstance();
    const translation = new TranslationMySQL(db);
    const userRepository = new UserRepositoryMySQL(db);
    const badgeRepository = new BadgeRepositoryMySQL(db);
    const postRepository = new PostRepositoryMySQL(db);
    const commentRepository = new CommentRepositoryMySQL(db);
    const postHistoryRepository = new PostHistoryRepositoryMySQL(db);
    const postLinkRepository = new PostLinkRepositoryMySQL(db);
    const tagRepository = new TagRepositoryMySQL(db);
    const voteRepository = new VoteRepositoryMySQL(db);

    const seedUseCase = new SeedUseCase(
      logger,
      xml,
      translation,
      userRepository,
      badgeRepository,
      postRepository,
      commentRepository,
      postHistoryRepository,
      postLinkRepository,
      tagRepository,
      voteRepository,
    );

    await seedUseCase.execute();
    logger.info("finish seed");
  } catch (err) {
    console.log(err);
    logger.error(err);
  } finally {
    await MySQLSingleton.end();
    process.exit();
  }
})();
