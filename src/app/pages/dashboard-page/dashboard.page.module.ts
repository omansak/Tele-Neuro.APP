import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardPage } from './dashboard.page';
import { CategoryComponentsModule } from 'src/app/components/category/category.components.module';
import { CategoryService } from 'src/app/services/category/category-service';
import { ContentService } from 'src/app/services/content/content-service';
import { StatService } from 'src/app/services/utility/stat-service';
import { RelationStatLogService } from 'src/app/services/utility/relation-stat-log-service';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
        PipesModule,
        CategoryComponentsModule,
    ],
    exports: [],
    declarations: [DashboardPage],
    providers: [CategoryService, ContentService, StatService, RelationStatLogService],
})
export class DashboardPageModule { }
