import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BrochureUserManagementPage } from './brochure-user-management.page';
import { NAVIGATION_ROUTE, ROUTE } from 'src/app/consts/navigation';
import { RouterModule } from '@angular/router';
import { BrochureService } from 'src/app/services/brochure/brochure-service';
import { BrochureComponentsModule } from 'src/app/components/brochure/brochure.components.module';
import { UserService } from 'src/app/services/user/user-service';
@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        // Route
        RouterModule.forChild([
            {
                path: ROUTE,
                component: BrochureUserManagementPage,
                data: NAVIGATION_ROUTE.ROUTE_BROCHURE_USER_MANAGEMENT
            }
        ]),
        // App
        SharedComponentsModule,
        BrochureComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [],
    declarations: [BrochureUserManagementPage],
    providers: [BrochureService, UserService],
})
export class BrochureUserManagementPageModule { }
