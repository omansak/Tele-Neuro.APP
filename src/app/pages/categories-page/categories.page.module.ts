import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NAVIGATION_ROUTE, ROUTE } from 'src/app/consts/navigation';
import { RouterModule } from '@angular/router';
import { CategoriesPage } from './categories.page';
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
                component: CategoriesPage,
                data: NAVIGATION_ROUTE.ROUTE_CATEGORIES
            }
        ]),
        // App
        SharedComponentsModule,
        CategoryComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [],
    declarations: [CategoriesPage],
    providers: [],
})
export class CategoriesPageModule { }
