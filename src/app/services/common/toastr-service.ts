import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
    constructor(private _toastrService: ToastrService) { }

    success(message?: string, title?: string, override?: Partial<IndividualConfig>) {
        this._toastrService.success(message, title, override)
    }

    error(message?: string, title?: string, override?: Partial<IndividualConfig>) {
        this._toastrService.error(message, title, override)
    }

    warning(message?: string, title?: string, override?: Partial<IndividualConfig>) {
        this._toastrService.warning(message, title, override)
    }

    info(message?: string, title?: string, override?: Partial<IndividualConfig>) {
        this._toastrService.info(message, title, override)
    }

    continuing(info: string, success?: string, error?: string) {
        return new ToastContinuing(this._toastrService, info, success, error);
    }

    clearAll() {
        this._toastrService.clear();
    }

    clearAllContinuing() {
        ToastContinuing.ToastQueue.forEach(i => {
            this._toastrService.clear(i);
        });
        ToastContinuing.ToastQueue = [];
    }
}

export class ToastContinuing {
    public static ToastQueue: Array<number> = [];
    private _id: number;
    constructor(
        private _toastrService: ToastrService,
        private _continuingMessage: string,
        private _successMessage?: string,
        private _errorMessage?: string) {
        this.initToast();
    }
    success() {
        this.clear();
        this._toastrService.success(this._successMessage);
    }

    error() {
        this._toastrService.error(this._errorMessage);
    }

    private clear() {
        ToastContinuing.ToastQueue = ToastContinuing.ToastQueue.filter(i => i != this._id);
        this._toastrService.clear(this._id);
    }

    private initToast() {
        this._id = this._toastrService
            .info(this.getInfoHtml(this._continuingMessage), undefined, { disableTimeOut: true, enableHtml: true, progressBar: true, tapToDismiss: false })
            .toastId;
        ToastContinuing.ToastQueue.push(this._id);
    }

    private getInfoHtml(message: string) {
        return '<div class="spinner text-center" >' + '<span class="mr-3">' + message + '</span><br/>' + '<div class="bounce1" > </div><div class="bounce2"></div > <div class="bounce3" > </div></div >';
    }
}