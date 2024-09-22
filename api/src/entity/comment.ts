export type Comment = {
  id: number | null;
  postId: number | null;
  score: number | null;
  text: string;
  creationDate: Date;
  userId: number | null;
  userDisplayName: string;
};
