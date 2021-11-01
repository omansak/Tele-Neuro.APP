import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { NAVIGATION_ROUTE } from "../consts/navigation";
import { AuthenticationService } from "../services/authentication/authentication-service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.authenticationService.clear();
                    this.router.navigate([NAVIGATION_ROUTE.ROUTE_LOGIN.Route], {
                        queryParams: { returnUrl: this.router.routerState.snapshot.url },
                    });
                }
                return next.handle(request);
            })
        );
    }
}