import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../app-auth/services/auth.service';
import { AlertService } from '../../app-alert/services/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        [this.validateUsernameAvailability()]
      ],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        [this.validateEmailNotTaken()]
      ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onFormSubmit() {
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.authService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.toastr.success('Thank you! You were successfully registered. Please Login to continue!');
                this.router.navigate(['/user/login']);
            },
            error => {
              this.alertService.error(error || 'Sorry! Something went wrong. Please try again!');
            });
  }

  validateUsernameAvailability(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.checkUsernameAvailability(control.value).pipe(
        map(res => {
          return res.available ? null : { usernameTaken: true };
        })
      );
    };
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.checkEmailAvailability(control.value).pipe(
        map(res => {
          return res.available ? null : { emailTaken: true };
        })
      );
    };
  }

}
