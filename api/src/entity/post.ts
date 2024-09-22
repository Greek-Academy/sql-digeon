export type Post = {
  id: number | null;
  postTypeId: number | null;
  acceptedAnswerId: number | null;
  creationDate: Date;
  score: number | null;
  body: string;
  ownerUserId: number | null;
  ownerDisplayName: string;
  lastEditorUserId: number | null;
  lastEditorDisplayName: string;
  lastEditDate: Date;
  lastActivityDate: Date;
  title: string;
  tags: number | null;
  answerCount: number | null;
  commentCount: number | null;
  communityOwnedDate: Date;
  contentLicense: string;
};
