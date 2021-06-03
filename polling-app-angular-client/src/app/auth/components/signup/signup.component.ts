import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UniqueUsernameValidator } from '../../validators/unique-username-validator';
import { UniqueEmailValidator } from '../../validators/unique-email-validator';
import { AuthFacade } from '../../store/auth.facade';
import { UserProfileInfo } from 'src/app/user/models/user-profile-info';
import { SignUpRequestInfo } from '../../models/signup-request-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,
    // private authService: AuthService,
    private authFacade: AuthFacade,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private uniqueEmailValidator: UniqueEmailValidator
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
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

  // convenience getter for easy access to form fields
  get formField() {
    return this.signUpForm.controls;
  }

  isFormFieldInvalid(fieldName: string): boolean {
    const formField = this.signUpForm.get(fieldName);
    return formField.touched && !formField.valid;
  }

  onSignUpSubmit() {
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    let signUpRequest: SignUpRequestInfo = this.signUpForm.value;

    this.authFacade.register(signUpRequest);

    /*this.authService
      .registerUser(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.toastr.success(
          //   "Thank you! You're successfully registered. Please Login to continue!"
          // );
          this.router.navigate(['/login']);
        },
        (error) => {
          // const errorMessage = this.authService.getErrorMessage(
          //   error.error.message
          // );
          // this.store.dispatch(setMessage({ message: errorMessage }));
          // this.alertService.error(
          //   error || 'Sorry! Something went wrong. Please try again!'
          // );
        }
      );*/
  }
}
