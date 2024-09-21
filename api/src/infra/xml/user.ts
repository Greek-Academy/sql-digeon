import { XmlCore } from "@/infra/xml/core";
import { UsersXml, convertUsersFromXml } from "@/xml/user";

export const usersXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<UsersXml>().read(`${xmlPath}/Users.xml`);
    return xml.entity((xml) => convertUsersFromXml(xml.users.row));
  } catch (error) {
    throw new Error(`XMLファイルの読み込みに失敗しました: ${error}`);
  }
};
