import { UserInfo } from "../../app-auth/models/user-info";
import { ChoiceInfo } from "./choice-info";

export class PollInfo {
    id: number;
    question: string;
    choices: ChoiceInfo[];
    createdBy: UserInfo;
    creationDateTime: Date;
    expirationDateTime: Date;
    expired: boolean;
    selectedChoice: number;
    totalVotes: number;
}