import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { LoginPage } from './login.page';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        // Route
        RouterModule.forChild([
            {
                path: ROUTE,
                component: LoginPage,
                data: NAVIGATION_ROUTE.ROUTE_LOGIN
            }
        ]),
        // App
        SharedComponentsModule
    ],
    exports: [],
    declarations: [LoginPage],
    providers: [],
})
export class LoginPageModule { }
