import { ChoiceInfo } from './choice-info';
import { UserProfileInfo } from './user-profile-info';

export interface PollInfo {
  id: number;
  question: string;
  choices: ChoiceInfo[];
  createdBy: UserProfileInfo;
  creationDateTime: Date;
  expirationDateTime: Date;
  expired: boolean;
  selectedChoice: number;
  totalVotes: number;
}
