import type { User } from "@/entity/user";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type UserXml = {
  $: {
    Id: string;
    Reputation: string;
    CreationDate: string;
    DisplayName: string;
    LastAccessDate: string;
    WebsiteUrl: string;
    Location: string;
    AboutMe: string;
    Views: string;
    UpVotes: string;
    DownVotes: string;
    AccountId: string;
  };
};

export type UsersXml = {
  users: {
    row: UserXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertUsersFromXml = (usersXml: UserXml[]): User[] => {
  return usersXml.map((user) => ({
    id: Number.parseInt(user.$.Id) || null,
    reputation: Number.parseInt(user.$.Reputation) || null,
    creationDate: new Date(user.$.CreationDate),
    displayName: user.$.DisplayName,
    lastAccessDate: new Date(user.$.LastAccessDate),
    websiteUrl: user.$.WebsiteUrl,
    location: user.$.Location,
    aboutMe: user.$.AboutMe,
    views: Number.parseInt(user.$.Views) || null,
    upVotes: Number.parseInt(user.$.UpVotes) || null,
    downVotes: Number.parseInt(user.$.DownVotes) || null,
    accountId: Number.parseInt(user.$.AccountId) || null,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const usersXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<UsersXml>().read(`${xmlPath}/Users.xml`);
    return xml.entity((xml) => convertUsersFromXml(xml.users.row));
  } catch (error) {
    throw new Error(`XMLファイルの読み込みに失敗しました: ${error}`);
  }
};
