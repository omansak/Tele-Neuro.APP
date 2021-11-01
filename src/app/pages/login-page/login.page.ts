import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { AppComponent } from "src/app/app.component";
import { ONgTextareaComponent } from "src/app/components/shared/o-ng-textarea/o-ng-textarea.component";
import { ROUTE } from "src/app/consts/navigation";
import { VALIDATE_TEXT } from "src/app/consts/validate";
import { CardLoaderDirective } from "src/app/directives/card-loader.directive";
import { UserLoginModel } from "src/app/models/user/user-login.model";
import { AuthenticationService } from "src/app/services/authentication/authentication-service";
import { ToastService } from "src/app/services/common/toastr-service";

@Component({
    templateUrl: './login.page.html',
    providers: []
})
export class LoginPage implements AfterViewInit, OnInit {
    // Publics
    public model: UserLoginModel = new UserLoginModel();
    public validate = {
        text: VALIDATE_TEXT
    }
    // View Children
    @ViewChild('emailElement', { static: true })
    public emailElement: ONgTextareaComponent;
    @ViewChild('passwordElement', { static: true })
    public passwordElement: ONgTextareaComponent;
    @ViewChild(CardLoaderDirective)
    public cardLoaderDirective: CardLoaderDirective;

    constructor(
        private _appComponent: AppComponent,
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _toastService: ToastService) { }

    ngOnInit(): void {
        if (this._authenticationService.isLogged()) {
            this._router.navigate([this._activatedRoute.snapshot.queryParams['returnUrl'] || ROUTE]);
        }
    }

    ngAfterViewInit(): void {
        this._appComponent.changeBodyPublicLayoutClass();
    }

    check() {
        return this.emailElement.check() && this.passwordElement.check();
    }

    login() {
        if (this.check()) {
            let toast = this._toastService.continuing("Giriş yapılıyor", "Kullanıcı girişi yapıldı");
            this.cardLoaderDirective.start();
            this._authenticationService
                .login(this.model)
                .pipe(finalize(() => {
                    this.cardLoaderDirective.stop();
                    toast.success();
                }))
                .subscribe(
                    (i) => {
                        if (i) {
                            this._router.navigate([this._activatedRoute.snapshot.queryParams['returnUrl'] || ROUTE]).finally(() => {
                                this._appComponent.changeBodyVerticalLayoutClass();
                            });
                        }
                    });
        }
    }
}