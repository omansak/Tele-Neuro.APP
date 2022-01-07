import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { NAVIGATION_ROUTE } from '../consts/navigation';
import { AuthenticationService } from '../services/authentication/authentication-service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
    constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._authenticationService.isLogged()) {
            return true;
        }
        this._router.navigate([NAVIGATION_ROUTE.ROUTE_LOGIN.Route], {
            queryParams: { returnUrl: this._router.routerState.snapshot.url },
        });
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}