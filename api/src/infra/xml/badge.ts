import { XmlCore } from "@/infra/xml/core";
import { type BadgesXml, convertBadgesFromXml } from "@/xml/badge";

export const badgesXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<BadgesXml>().read(`${xmlPath}/Badges.xml`);
    return xml.entity((xml) => convertBadgesFromXml(xml.badges.row));
  } catch (error) {
    throw new Error(`XMLファイルの読み込みに失敗しました: ${error}`);
  }
};
