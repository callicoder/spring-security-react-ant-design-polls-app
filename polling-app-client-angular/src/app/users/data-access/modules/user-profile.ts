export interface UserProfile {
  id: number;
  username: string;
  name: string;
  joinedAt: Date;
  pollCount: number;
  voteCount: number;
}
