import { Observable, throwError, TimeoutError, empty } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IExceptionHandler } from '../base-service';
import { ToastService } from './toastr-service';
import { LCL_AUTHORIZATION_EXCEPTION, LCL_AUTHORIZATION_EXCEPTION_MESSAGE, LCL_CLIENT_EXCEPTION, LCL_CLIENT_EXCEPTION_MESSAGE, LCL_ERROR, LCL_TIMEOUT, LCL_TIMEOUT_MESSAGE, LCL_UNHANDLED_EXCEPTION, LCL_UNHANDLED_EXCEPTION_MESSAGE, LCL_UNKNOWN_EXCEPTION, LCL_UNKNOWN_EXCEPTION_MESSAGE } from 'src/app/consts/locales';
import { NAVIGATION_ROUTE } from 'src/app/consts/navigation';

@Injectable()
export class ExceptionHandler implements IExceptionHandler {
    constructor(private _router: Router, private _toastService: ToastService) { }
    public handler(err: any): Observable<never> {
        this._toastService.clearAllContinuing(false);

        // 401
        if (err.status === 401) {
            this._router.navigate([NAVIGATION_ROUTE.ROUTE_LOGIN.Route], {
                queryParams: { returnUrl: this._router.routerState.snapshot.url },
            });
            //this._toastService.error(LCL_AUTHORIZATION_EXCEPTION_MESSAGE, LCL_AUTHORIZATION_EXCEPTION);
            return throwError(err);
        }

        // 404
        if (err.status === 404) {
            //this._router.navigate([ROUTE_ERROR_404]);
            return empty();
        }

        // Timeout Error
        if (err instanceof TimeoutError) {
            this._toastService.error(LCL_TIMEOUT_MESSAGE, LCL_TIMEOUT);
            return throwError(LCL_TIMEOUT_MESSAGE);
        }

        // 500 - Server Error
        if (err.error && err.error.Status) {
            this._toastService.error(`${err.error.Status.Message}`, LCL_ERROR);
            return throwError(`${err.error.Status.Message}`);
        }

        // Angular Error
        if (err.error instanceof ErrorEvent) {
            this._toastService.error(LCL_CLIENT_EXCEPTION_MESSAGE, LCL_CLIENT_EXCEPTION);
            return throwError(LCL_CLIENT_EXCEPTION_MESSAGE);
        }

        // Other
        if (err.status != null && err.status == 0) {
            this._toastService.error(LCL_UNKNOWN_EXCEPTION_MESSAGE, LCL_UNKNOWN_EXCEPTION);
            return throwError(LCL_UNKNOWN_EXCEPTION_MESSAGE);
        }
        this._toastService.error(LCL_UNHANDLED_EXCEPTION_MESSAGE, LCL_UNHANDLED_EXCEPTION);
        return throwError(LCL_UNHANDLED_EXCEPTION_MESSAGE);
    }
}