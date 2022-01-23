import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication-service';

@Pipe({ name: 'hasRole' })
export class HasRolePipe implements PipeTransform {
  constructor(public _authenticationService: AuthenticationService) { }

  transform(role: string, greaterEqual: boolean = true): boolean {
    return this._authenticationService.userHasRole(role,greaterEqual);
  }
}