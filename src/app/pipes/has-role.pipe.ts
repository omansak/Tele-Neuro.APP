import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication-service';

@Pipe({ name: 'hasRole' })
export class HasRolePipe implements PipeTransform {
  constructor(public _authenticationService: AuthenticationService) { }

  transform(role: string): boolean {
    return this._authenticationService.userHasRole(role);
  }
}