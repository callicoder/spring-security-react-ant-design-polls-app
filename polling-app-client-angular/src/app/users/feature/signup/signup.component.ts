import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from '../../data-access/user.service';
import { UniqueUsernameValidator } from '../../utils/validators/unique-username-validator';
import { UniqueEmailValidator } from '../../utils/validators/unique-email-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private uniqueEmailValidator: UniqueEmailValidator,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
          asyncValidators: [
            this.uniqueUsernameValidator.validate.bind(
              this.uniqueUsernameValidator
            ),
          ],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
          ],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  // Convenience getter for easy access to form fields.
  get formField(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  isFormFieldInvalid(fieldName: string): boolean {
    const formField = this.signupForm.get(fieldName);
    return (formField?.touched && formField?.invalid) || false;
  }

  onSubmit() {
    // Stop here if form is invalid.
    if (this.signupForm.invalid) {
      return;
    }

    this.userService
      .registerUser(this.signupForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            "Thank you! You're successfully registered. Please Login to continue!"
          );
          this.router.navigate(['/login']);
        },
        error: () => {
          this.alertService.danger('Unable to register user');
        },
      });
  }
}
