import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserComponentStore } from '../../data-access/user.component.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    usernameOrEmail: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userComponentStore: UserComponentStore
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Convenience getter for easy access to form fields.
  get formField(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  isFormFieldInvalid(fieldName: string): boolean {
    const formField = this.loginForm.get(fieldName);
    return (formField?.touched && formField?.invalid) || false;
  }

  onSubmit() {
    // Stop here if form is invalid.
    if (this.loginForm.invalid) {
      return;
    }

    this.userComponentStore.login(this.loginForm.value);
  }
}
