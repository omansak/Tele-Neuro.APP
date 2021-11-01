import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, BehaviorSubject, Observable, of } from "rxjs";
import { map, delay, tap } from "rxjs/operators";
import { LocalStorageHelper } from "src/app/helpers/local-storage-helper";
import { LoginResultModel } from "src/app/models/user/login-result-model";
import { UserLoginModel } from "src/app/models/user/user-login.model";
import { UserModel } from "src/app/models/user/user-model";
import { environment } from "src/environments/environment";
import { BaseService } from "../base-service";
import jwt_decode from "jwt-decode";
import { NetCoreClaimTypes } from "src/app/consts/net-core-claim-types";
import { NAVIGATION_ROUTE } from "src/app/consts/navigation";
import { ExceptionHandler } from "../common/exception-handler";

@Injectable()
export class AuthenticationService extends BaseService {
    private accessTokenStorageName = "uuid-at";
    private refreshTokenStorageName = "uuid-rt";
    private localStorageHelper = new LocalStorageHelper();
    private timer: Subscription;
    private userSubject: BehaviorSubject<UserModel | null>;
    constructor(private router: Router, httpClient: HttpClient, exceptionHandler: ExceptionHandler) {
        super(httpClient, exceptionHandler);
        this.userSubject = new BehaviorSubject<UserModel | null>(this.parseToken(this.getToken()));
    }

    login(model: UserLoginModel): Observable<UserModel | null> {
        return super.httpPostModel<LoginResultModel>(LoginResultModel, `${environment.request.endPoints.login.login}`, model)
            .pipe(
                map((i) => {
                    if (i != null) {
                        let user = this.parseToken(i.AccessToken);
                        if (user && this.startTokenTimer(user.TokenExpirationTimeStamp)) {
                            this.setLocalStorage(i);
                            this.userSubject.next(user);
                            return user;
                        }
                    }
                    return null;
                })
            );
    }

    logout(): Observable<boolean | null> {
        return super.httpPostValue<boolean>(`${environment.request.endPoints.login.logout}`).pipe(
            tap(i => {
                if (i) {
                    this.clear();
                    this.router.navigate([NAVIGATION_ROUTE.ROUTE_LOGIN.Route]);
                }
            })
        );
    }

    refreshToken() {
        const refreshToken = localStorage.getItem(this.refreshTokenStorageName);
        if (!refreshToken) {
            this.clear();
            return of(null);
        }

        return super.httpPostModel<LoginResultModel>(LoginResultModel, `${environment.request.endPoints.login.refreshToken}`, { refreshToken })
            .pipe(
                map((i) => {
                    console.log(111, i);

                    if (i != null) {
                        let user = this.parseToken(i.AccessToken);
                        if (user && this.startTokenTimer(user.TokenExpirationTimeStamp)) {
                            this.setLocalStorage(i);
                            this.userSubject.next(user);
                            return user;
                        }
                    }
                    return null;
                })
            );
    }

    getUserObservable(): Observable<UserModel | null> {
        return this.userSubject.asObservable();
    }

    getUser(): UserModel | null {
        return this.userSubject.value;
    }

    isLogged(): boolean {
        return !!this.getUser() &&
            !!this.localStorageHelper.getItem(this.accessTokenStorageName) &&
            !!this.localStorageHelper.getItem(this.refreshTokenStorageName) &&
            this.getUser()?.Token == this.localStorageHelper.getItem(this.accessTokenStorageName);
    }

    clear() {
        this.localStorageHelper.removeItem(this.accessTokenStorageName);
        this.localStorageHelper.removeItem(this.refreshTokenStorageName);
        this.userSubject.next(null);
        this.stopTokenTimer();
    }

    private setLocalStorage(model: LoginResultModel) {
        this.localStorageHelper.setItem(this.accessTokenStorageName, model.AccessToken);
        this.localStorageHelper.setItem(this.refreshTokenStorageName, model.RefreshToken);
    }

    private startTokenTimer(expirationTimeStamp: number): boolean {
        const timeout = new Date(expirationTimeStamp * 1000).getTime() - Date.now();
        if (timeout > 0) {
            this.stopTokenTimer();
            this.timer = of(true)
                .pipe(
                    delay(timeout),
                    tap(() => this.refreshToken().subscribe())
                )
                .subscribe();
            return true;
        }
        return false;
    }

    private stopTokenTimer() {
        this.timer?.unsubscribe();
    }

    private getToken(): string | null {
        return this.localStorageHelper.getItem(this.accessTokenStorageName);
    }

    private getRefreshToken(): string | null {
        return this.localStorageHelper.getItem(this.refreshTokenStorageName);
    }

    private parseToken(token: string | null): UserModel | null {
        if (token) {
            const decoded: any = jwt_decode(token);
            if (decoded && decoded.exp > (Date.now() / 1000)) {
                let user = new UserModel();
                user.Token = token;
                user.Id = decoded[NetCoreClaimTypes.NameIdentifier];
                user.TokenExpirationTimeStamp = decoded.exp;
                if (decoded[NetCoreClaimTypes.Role]) {
                    if (Array.isArray(decoded[NetCoreClaimTypes.Role]))
                        user.Roles = decoded[NetCoreClaimTypes.Role];
                    else
                        user.Roles = [decoded[NetCoreClaimTypes.Role]]
                }
                return user;
            }
        }
        return null;
    }
}