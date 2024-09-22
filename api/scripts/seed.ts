import { Xml } from "@/infra/xml/core";
import { BadgeRepositoryMySQL } from "@/repository/mysql/badge";
import { MySQLSingleton } from "@/repository/mysql/core";
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
    const seedUseCase = new SeedUseCase(
      translation,
      userRepository,
      badgeRepository,
    );

    const xml = new Xml();
    const users = await xml.users();
    const badges = await xml.badges();

    await seedUseCase.execute(users, badges);

    console.log("データの投入が完了しました");
  } catch (err) {
    console.error("エラーが発生しました:", err);
  } finally {
    await MySQLSingleton.end();
    process.exit();
  }
})();
