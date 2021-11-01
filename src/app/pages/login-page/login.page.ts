import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ONgTextareaComponent } from "src/app/components/shared/o-ng-textarea/o-ng-textarea.component";
import { ROUTE } from "src/app/consts/navigation";
import { VALIDATE_TEXT } from "src/app/consts/validate";
import { UserLoginModel } from "src/app/models/user/user-login.model";
import { AuthenticationService } from "src/app/services/authentication/authentication-service";

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

    constructor(
        private _appComponent: AppComponent,
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) { }

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
            this._authenticationService
                .login(this.model)
                .subscribe(
                    (i) => {
                        if (i) {
                            this._router.navigate([this._activatedRoute.snapshot.queryParams['returnUrl'] || ROUTE]);
                            this._appComponent.changeBodyVerticalLayoutClass();
                        }
                    });
        }
    }
}