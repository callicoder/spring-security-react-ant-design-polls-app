import { ChoiceResponse } from './choice-response';
import { UserProfile } from 'src/app/users/data-access/modules/user-profile';

export interface PollResponse {
  id: number;
  question: string;
  choices: ChoiceResponse[];
  createdBy: UserProfile;
  creationDateTime: Date;
  expirationDateTime: Date;
  expired: boolean;
  selectedChoice: number;
  totalVotes: number;
}
