export type Vote = {
  id: number | null;
  postId: number | null;
  voteTypeId: number | null;
  userId: number | null;
  creationDate: Date;
  bountyAmount: number | null;
};
