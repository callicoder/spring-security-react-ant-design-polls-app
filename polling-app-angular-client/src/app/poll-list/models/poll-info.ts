import { UserProfileInfo } from '../../user/models/user-profile-info';
import { ChoiceInfo } from './choice-info';

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
