import { VoteInfo } from './../models/vote-info';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PollInfo } from '../models/poll-info';
import { ChoiceInfo } from '../models/choice-info';
import { AuthService } from '../../app-auth/services/auth.service';
import { PollService } from './../services/polling.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'poll-view',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  @Input() public poll: PollInfo;
  currentVote: number;
  voteForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.voteForm = this.formBuilder.group({
      choiceGroup: new FormControl()
    });
    this.currentVote = this.poll.selectedChoice;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  calculatePercentage = (totalVotes, choice) => {
    if (totalVotes === 0) {
        return 0;
    }
    const percentVote = (choice.voteCount * 100) / totalVotes;
    return Math.round(percentVote * 100) / 100;
  }

  isWinner(poll: PollInfo, choice: ChoiceInfo) {
    const winningChoice: any = poll.expired ? this.getWinningChoice(poll.choices) : null;

    return winningChoice && choice.id === winningChoice.id;
  }

  getWinningChoice(choices: ChoiceInfo[]) {
    return choices.reduce((prevChoice, currentChoice) =>
            currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice,
            {voteCount: -Infinity}
        );
  }

  getTimeRemaining = (poll) => {
    const expirationTime = new Date(poll.expirationDateTime).getTime();
    const currentTime = new Date().getTime();

    let difference_ms = expirationTime - currentTime;
    let seconds = Math.floor( (difference_ms / 1000) % 60 );
    let minutes = Math.floor( (difference_ms / 1000 / 60) % 60 );
    let hours = Math.floor( (difference_ms / (1000 * 60 * 60)) % 24 );
    let days = Math.floor( difference_ms / (1000 * 60 * 60 * 24) );

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
  }

  handleVoteChange(poll: PollInfo, choiceId: number) {
    this.currentVote = choiceId;
  }

  handleVoteSubmit() {
    if (!this.isLoggedIn()) {
      this.toastr.info('Please login to vote.','Polling App');
      this.router.navigate(['/user/login']);
    }

    const voteData = {} as VoteInfo;
    voteData.pollId = this.poll.id;
    voteData.choiceId = this.voteForm.get('choiceGroup').value;

    this.pollService.castPoll(voteData)
    .pipe(first())
        .subscribe(
            data => {
                this.poll = data;
            },
            error => {
              if (error.status === 401) {
                this.authService.logout();
                this.toastr.error('You have been logged out. Please login to vote');
                this.router.navigate(['/user/login']);
              } else {
                this.toastr.error(error || 'Sorry! Something went wrong. Please try again!');
              }
            });
  }

}
