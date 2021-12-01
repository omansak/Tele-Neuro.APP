import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CategoryDetailPage } from './category-detail.page';
import { NAVIGATION_ROUTE, ROUTE } from 'src/app/consts/navigation';
import { RouterModule } from '@angular/router';
import { ProgramComponentsModule } from 'src/app/components/program/program.components.module';
@NgModule({
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        // Route
        RouterModule.forChild([
            {
                path: ROUTE,
                component: CategoryDetailPage,
                data: NAVIGATION_ROUTE.ROUTE_CATEGORY
            }
        ]),
        // App
        SharedComponentsModule,
        ProgramComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [],
    declarations: [CategoryDetailPage],
    providers: [],
})
export class CategoryDetailPageModule { }
