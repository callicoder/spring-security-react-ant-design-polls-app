import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChoiceResponse } from '../../data-access/models/choice-response';
import { PollResponse } from '../../data-access/models/poll-response';
import { VoteRequest } from './../../data-access/models/vote-request';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollDetailComponent implements OnInit {
  @Input() poll!: PollResponse;
  @Output() vote: EventEmitter<VoteRequest> = new EventEmitter();

  currentVote!: number;
  voteForm: FormGroup = new FormGroup({
    choiceGroup: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.voteForm = this.formBuilder.group({
      choiceGroup: new FormControl(),
    });
    this.currentVote = this.poll.selectedChoice;
  }

  calculatePercentage = (totalVotes: number, choice: ChoiceResponse) => {
    if (totalVotes === 0) {
      return 0;
    }
    let percentVote = (choice.voteCount * 100) / totalVotes;
    return Math.round(percentVote * 100) / 100;
  };

  isWinner(poll: PollResponse, choice: ChoiceResponse): boolean {
    let winningChoice: any = poll.expired
      ? this.getWinningChoice(poll.choices)
      : null;

    return winningChoice && choice.id === winningChoice.id;
  }

  getWinningChoice(choices: ChoiceResponse[]) {
    return choices.reduce(
      (prevChoice, currentChoice) =>
        currentChoice.voteCount > prevChoice.voteCount
          ? currentChoice
          : prevChoice,
      { voteCount: -Infinity }
    );
  }

  getTimeRemaining = (poll: PollResponse) => {
    const expirationTime = new Date(poll.expirationDateTime).getTime();
    const currentTime = new Date().getTime();

    var difference_ms = expirationTime - currentTime;
    var seconds = Math.floor((difference_ms / 1000) % 60);
    var minutes = Math.floor((difference_ms / 1000 / 60) % 60);
    var hours = Math.floor((difference_ms / (1000 * 60 * 60)) % 24);
    var days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));

    let timeRemaining;

    if (days > 0) {
      timeRemaining = days + ' days left';
    } else if (hours > 0) {
      timeRemaining = hours + ' hours left';
    } else if (minutes > 0) {
      timeRemaining = minutes + ' minutes left';
    } else if (seconds > 0) {
      timeRemaining = seconds + ' seconds left';
    } else {
      timeRemaining = 'less than a second left';
    }

    return timeRemaining;
  };

  handleVoteChange(choiceId: number): void {
    this.currentVote = choiceId;
  }

  onVoteSubmit(): void {
    let voteRequest = {} as VoteRequest;
    voteRequest.pollId = this.poll.id;
    voteRequest.choiceId = this.voteForm.get('choiceGroup')?.value;
    this.vote.emit(voteRequest);
  }
}
