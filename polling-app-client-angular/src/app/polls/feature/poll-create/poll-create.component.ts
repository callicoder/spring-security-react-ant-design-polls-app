import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { first } from 'rxjs/operators';
import { PollService } from '../../data-access/poll.service';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
})
export class PollCreateComponent implements OnInit {
  pollForm: FormGroup = new FormGroup({
    question: new FormControl(''),
    choices: new FormControl(''),
    days: new FormControl(''),
    hours: new FormControl(''),
  });
  dayList = Array.from(Array(8).keys());
  hourList = Array.from(Array(24).keys());

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pollService: PollService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(140)]],
      choices: this.formBuilder.array([
        this.formBuilder.group({ text: '' }),
        this.formBuilder.group({ text: '' }),
      ]),
      days: [null],
      hours: [null],
    });
    this.formField['days'].setValue(1, { onlySelf: true });
    this.formField['hours'].setValue(0, { onlySelf: true });
  }

  // Convenience getter for easy access to form fields.
  get formField(): { [key: string]: AbstractControl } {
    return this.pollForm.controls;
  }

  get choices() {
    return this.pollForm.get('choices') as FormArray;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.pollForm.invalid) {
      return;
    }

    this.pollService
      .createPoll(this.pollForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Poll was successfully created.');
          this.router.navigate(['/']);
        },
        error: () => {
          this.alertService.danger('Unable to create a new poll');
        },
      });
  }

  addChoice() {
    const choices = this.formField['choices'] as FormArray;
    choices.push(this.formBuilder.group({ text: '' }));
  }

  removeChoice(choiceNumber: number) {
    const choices = this.formField['choices'] as FormArray;
    choices.removeAt(choiceNumber);
  }
}
