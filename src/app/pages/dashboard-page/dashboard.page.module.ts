import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardPage } from './dashboard.page';
import { CategoryComponentsModule } from 'src/app/components/category/category.components.module';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        // Route
        RouterModule.forChild([
            {
                path: ROUTE,
                component: DashboardPage,
                data: NAVIGATION_ROUTE.ROUTE_DASHBOARD
            }
        ]),
        // App
        SharedComponentsModule,
        DirectivesModule,
        CategoryComponentsModule,
    ],
    exports: [],
    declarations: [DashboardPage],
    providers: [],
})
export class DashboardPageModule { }
