import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from 'src/app/store/facades/auth.facade';

import { SignUpRequestInfo } from '../../models/signup-request-info';
import { UniqueEmailValidator } from '../../validators/unique-email-validator';
import { UniqueUsernameValidator } from '../../validators/unique-username-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
  }
}
