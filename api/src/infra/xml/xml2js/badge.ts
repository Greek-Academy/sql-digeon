import type { Badge } from "@/entity/badge";
import { XmlError } from "@/errors/xmlError";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type BadgeXml = {
  $: {
    Id: string;
    UserId: string;
    Name: string;
    Date: string;
    Class: string;
    TagBased: string;
  };
};

export type BadgesXml = {
  badges: {
    row: BadgeXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertBadgesFromXml = (badgesXml: BadgeXml[]): Badge[] => {
  return badgesXml.map((badge) => ({
    id: Number.parseInt(badge.$.Id) || null,
    userId: Number.parseInt(badge.$.UserId) || null,
    name: badge.$.Name,
    date: new Date(badge.$.Date),
    class: badge.$.Class,
    tagBased: badge.$.TagBased === "true",
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const badgesXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<BadgesXml>().read(`${xmlPath}/Badges.xml`);
    return xml.entity((xml) => convertBadgesFromXml(xml.badges.row));
  } catch (error) {
    throw new XmlError("failed to read badges xml", error);
  }
};
