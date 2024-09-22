import { Xml } from "@/infra/xml/core";
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
    const seedUseCase = new SeedUseCase(translation, userRepository);
    const xml = new Xml();

    const users = await xml.users();
    await seedUseCase.execute(users);

    console.log("データの投入が完了しました");
  } catch (err) {
    console.error("エラーが発生しました:", err);
  } finally {
    await MySQLSingleton.end();
    process.exit();
  }
})();
