export type PostHistory = {
  id: number | null;
  postHistoryTypeId: number | null;
  postId: number | null;
  revisionGuid: string;
  creationDate: Date;
  userId: number | null;
  userDisplayName: string;
  comment: string;
  text: string;
  contentLicense: string;
};
