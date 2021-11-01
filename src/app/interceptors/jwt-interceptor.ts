import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication/authentication-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authenticationService.isLogged()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.getUser()!.Token}`
                }
            });
        }
        return next.handle(request);
    }
}