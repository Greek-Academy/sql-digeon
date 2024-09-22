import { Xml } from "@/infra/xml/core";
import { BadgeRepositoryMySQL } from "@/repository/mysql/badge";
import { CommentRepositoryMySQL } from "@/repository/mysql/comment";
import { MySQLSingleton } from "@/repository/mysql/core";
import { PostRepositoryMySQL } from "@/repository/mysql/post";
import { TranslationMySQL } from "@/repository/mysql/translation";
import { UserRepositoryMySQL } from "@/repository/mysql/user";
import { SeedUseCase } from "@/usecase/seed";

(async () => {
  try {
    // 依存性の注入
    const db = await MySQLSingleton.getInstance();

    const translation = new TranslationMySQL(db);
    const userRepository = new UserRepositoryMySQL(db);
    const badgeRepository = new BadgeRepositoryMySQL(db);
    const postRepository = new PostRepositoryMySQL(db);
    const commentRepository = new CommentRepositoryMySQL(db);

    const seedUseCase = new SeedUseCase(
      translation,
      userRepository,
      badgeRepository,
      postRepository,
      commentRepository,
    );

    const xml = new Xml();
    const users = await xml.users();
    const badges = await xml.badges();
    const posts = await xml.posts();
    const comments = await xml.comments();

    await seedUseCase.execute(users, badges, posts, comments);

    console.log("データの投入が完了しました");
  } catch (err) {
    console.error("エラーが発生しました:", err);
  } finally {
    await MySQLSingleton.end();
    process.exit();
  }
})();
