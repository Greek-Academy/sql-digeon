import { Xml } from "@/infra/xml/core";
import { MySQLSingleton } from "@/repository/mysql/core";
import { TranslationMySQL } from "@/repository/mysql/translation";
import { UserRepositoryMySQL } from "@/repository/mysql/user";

(async () => {
  try {
    const xml = new Xml();
    const users = await xml.users();

    // 依存性の注入
    const db = await MySQLSingleton.getInstance();
    const translation = new TranslationMySQL(db);
    const userRepository = new UserRepositoryMySQL(db);

    try {
      await translation.begin();
      await userRepository.create(users);
      await translation.commit();
    } catch (error) {
      await translation.rollback();
      throw error;
    }

    console.log("データの投入が完了しました");
  } catch (err) {
    console.error("エラーが発生しました:", err);
  } finally {
    await MySQLSingleton.end();
    process.exit();
  }
})();
