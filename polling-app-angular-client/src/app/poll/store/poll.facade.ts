import { Injectable } from '@angular/core';
import { PollService } from '../services/poll.service';

@Injectable()
export class PollFacade {
  constructor(private pollService: PollService) {}

  submit(pollData) {
    let polRequest = {
      question: pollData.question,
      choices: pollData.choices,
      pollLength: {
        days: pollData.days,
        hours: pollData.hours,
      },
    };
    return this.pollService.create(polRequest);
  }
}
