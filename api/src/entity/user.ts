export type User = {
  id: number | null;
  reputation: number | null;
  creationDate: Date;
  displayName: string;
  lastAccessDate: Date;
  websiteUrl: string;
  location: string;
  aboutMe: string;
  views: number | null;
  upVotes: number | null;
  downVotes: number | null;
  accountId: number | null;
};

export type UserCreationMonths = {
  month: number;
  count: number;
};
