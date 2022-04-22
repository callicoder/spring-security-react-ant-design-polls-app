import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserShellModule } from '../../feature/user-shell/user-shell.module';
import { UserService } from '../../data-access/user.service';

@Injectable({ providedIn: UserShellModule })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkUsernameAvailability(control.value).pipe(
      map((useriIdentity) =>
        useriIdentity.available ? null : { usernameTaken: true }
      ),
      catchError(() => of(null))
    );
  }
}
