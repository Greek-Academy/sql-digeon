import { User } from "@/entity/user";

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
    id: parseInt(user.$.Id) || null,
    reputation: parseInt(user.$.Reputation) || null,
    creationDate: new Date(user.$.CreationDate),
    displayName: user.$.DisplayName,
    lastAccessDate: new Date(user.$.LastAccessDate),
    websiteUrl: user.$.WebsiteUrl,
    location: user.$.Location,
    aboutMe: user.$.AboutMe,
    views: parseInt(user.$.Views) || null,
    upVotes: parseInt(user.$.UpVotes) || null,
    downVotes: parseInt(user.$.DownVotes) || null,
    accountId: parseInt(user.$.AccountId) || null,
  }));
};
