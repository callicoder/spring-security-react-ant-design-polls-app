import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from 'src/app/store/facades/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get formField() {
    return this.loginForm.controls;
  }

  isFormFieldInvalid(fieldName: string): boolean {
    const formField = this.loginForm.get(fieldName);
    return formField.touched && !formField.valid;
  }

  onLoginSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authFacade.login(this.loginForm.value);
  }
}
