import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared/shared.components.module';
import { FormsModule } from '@angular/forms';
import { CategoryComponentsModule } from 'src/app/components/category/category.components.module';
import { CategoryManagementPage } from './category-management.page';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ROUTE, NAVIGATION_ROUTE } from 'src/app/consts/navigation';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Route
    RouterModule.forChild([
      {
        path: ROUTE,
        component: CategoryManagementPage,
        data: NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT
      }
    ]),
    // App
    SharedComponentsModule,
    CategoryComponentsModule,
    DirectivesModule
  ],
  exports: [],
  declarations: [CategoryManagementPage],
  providers: [],
})
export class CategoryManagementPageModule { }
