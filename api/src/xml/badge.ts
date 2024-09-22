import type { Badge } from "@/entity/badge";

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
